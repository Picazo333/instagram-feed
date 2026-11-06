import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const outDir = process.env.EVIDENCE_DIR || "/opt/cursor/artifacts";
const base = process.env.FEED_URL || "http://127.0.0.1:4173/";
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const report = { console: [], overflow: [], axe: {}, states: {} };

async function newPage(width, height, reduced = false) {
  const page = await browser.newPage();
  page.setDefaultTimeout(15000);
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  if (reduced) {
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  }
  const logs = [];
  page.on("console", (message) => {
    if (message.type() === "error") logs.push(message.text());
  });
  page.on("pageerror", (error) => logs.push(String(error)));
  page.on("requestfailed", (request) => logs.push(`failed ${request.url()}`));
  page._logs = logs;
  return page;
}

async function axe(page) {
  await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
  return page.evaluate(async () => {
    const result = await window.axe.run(document, { resultTypes: ["violations"] });
    return result.violations.map((item) => ({
      id: item.id,
      impact: item.impact,
      help: item.help,
      nodes: item.nodes.length,
    }));
  });
}

const widths = [
  [320, 700],
  [390, 844],
  [768, 1024],
  [1024, 800],
  [1280, 900],
  [1440, 900],
  [1920, 1080],
];

for (const [width, height] of widths) {
  const page = await newPage(width, height);
  const response = await page.goto(base, { waitUntil: "networkidle0" });
  const metrics = await page.evaluate(() => {
    const lockups = [...document.querySelectorAll(".lockup")].map((element) => {
      const box = element.getBoundingClientRect();
      return {
        className: element.className,
        display: getComputedStyle(element).display,
        width: box.width,
      };
    });
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      motion: document.documentElement.getAttribute("data-motion"),
      lockups,
    };
  });
  report.overflow.push({ width, status: response.status(), ...metrics, console: page._logs });
  if ([390, 768, 1280].includes(width)) {
    await page.screenshot({ path: path.join(outDir, `feed-${width}.png`), fullPage: true });
    await page.screenshot({ path: path.join(outDir, `feed-${width}-top.png`) });
  }
  if (width === 320) {
    await page.screenshot({ path: path.join(outDir, "feed-320.png"), fullPage: true });
  }
  await page.close();
}

{
  const page = await newPage(768, 900);
  await page.goto(base, { waitUntil: "networkidle0" });
  report.axe.feed = await axe(page);
  await page.click("#post-2 .post-photo");
  await page.waitForSelector("dialog[open]");
  await page.screenshot({ path: path.join(outDir, "dialog-768.png") });
  report.axe.dialog = await axe(page);
  const before = await page.evaluate(() => document.activeElement.id);
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => !document.querySelector("dialog[open]"));
  const after = await page.evaluate(() => document.activeElement.className);
  report.states.dialog = { closeFocused: before, focusReturnedTo: after, console: page._logs };
  await page.close();
}

{
  const page = await newPage(1280, 800);
  await page.goto(base, { waitUntil: "networkidle0" });
  await page.keyboard.press("Tab");
  await page.screenshot({ path: path.join(outDir, "focus-skip-1280.png") });
  report.states.skip = await page.evaluate(() => document.activeElement.textContent.trim());
  await page.close();
}

{
  const page = await newPage(390, 844, true);
  await page.goto(base, { waitUntil: "networkidle0" });
  const initial = await page.evaluate(() => document.documentElement.getAttribute("data-motion"));
  const transition = await page.evaluate(() => getComputedStyle(document.querySelector(".post")).transitionDuration);
  await page.screenshot({ path: path.join(outDir, "reduced-motion-390.png"), fullPage: true });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await page.waitForFunction(() => document.documentElement.getAttribute("data-motion") === "full");
  const changed = await page.evaluate(() => document.documentElement.getAttribute("data-motion"));
  report.states.reduced = { initial, transition, changed, console: page._logs };
  await page.close();
}

{
  const page = await newPage(390, 844);
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (request.url().includes("my-first-photo.webp")) {
      setTimeout(() => request.continue().catch(() => {}), 1200);
      return;
    }
    request.continue().catch(() => {});
  });
  const pending = page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#post-1 .post-figure")?.dataset.state === "loading");
  await page.screenshot({ path: path.join(outDir, "loading-state-390.png") });
  await pending;
  await page.setRequestInterception(false);
  report.states.loading = { sawLoading: true, console: page._logs };
  await page.close();
}

{
  const page = await newPage(390, 844);
  await page.goto(base, { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    document.querySelector("#post-3 img").src = "/missing-photo.jpg";
  });
  await page.waitForFunction(() => document.querySelector("#post-3 .post-figure").dataset.state === "error");
  await page.evaluate(() => document.querySelector("#post-3").scrollIntoView({ block: "center" }));
  await page.screenshot({ path: path.join(outDir, "error-state-390.png") });
  const label = await page.evaluate(() => document.querySelector("#post-3 .post-status").textContent);
  report.states.error = { label, console: page._logs };
  await page.close();
}

{
  const page = await newPage(390, 844);
  const response = await page.goto(`${base}missing-page`, { waitUntil: "networkidle0" });
  await page.screenshot({ path: path.join(outDir, "not-found-390.png"), fullPage: true });
  report.states.notFound = { status: response.status(), console: page._logs };
  await page.close();
}

{
  const page = await newPage(390, 844);
  await page.goto(base, { waitUntil: "networkidle0" });
  const recorder = await page.screencast({ path: path.join(outDir, "feed-tour.webm") });
  await new Promise((resolve) => setTimeout(resolve, 800));
  await page.evaluate(() => window.scrollTo({ top: 640, behavior: "instant" }));
  await new Promise((resolve) => setTimeout(resolve, 900));
  await page.click("#post-2 .post-photo");
  await page.waitForSelector("dialog[open]");
  await new Promise((resolve) => setTimeout(resolve, 1800));
  await page.keyboard.press("Escape");
  await new Promise((resolve) => setTimeout(resolve, 700));
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await new Promise((resolve) => setTimeout(resolve, 1400));
  await recorder.stop();
  report.states.video = { console: page._logs };
  await page.close();
}

writeFileSync(path.join(outDir, "capture-report.json"), JSON.stringify(report, null, 2));
await browser.close();
console.log(JSON.stringify(report, null, 2));
