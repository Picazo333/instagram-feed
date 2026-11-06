import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(message) {
  failures.push(message);
  console.error("FAIL", message);
}

function pass(message) {
  console.log("PASS", message);
}

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, encoding: "utf8" });
  if (result.status !== 0) {
    fail(`${command} ${args.join(" ")} exited ${result.status}\n${result.stdout}\n${result.stderr}`);
    return;
  }
  pass(`${command} ${args.join(" ")}`);
}

function contrast(foreground, background) {
  const lum = (hex) => {
    const value = hex.replace("#", "");
    const channels = [0, 2, 4].map((index) => {
      const channel = Number.parseInt(value.slice(index, index + 2), 16) / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const lighter = Math.max(lum(foreground), lum(background));
  const darker = Math.min(lum(foreground), lum(background));
  return (lighter + 0.05) / (darker + 0.05);
}

const html = readFileSync(path.join(root, "index.html"), "utf8");
const css = readFileSync(path.join(root, "styles.css"), "utf8");
const required = [
  "Breathe Code Photo Feed",
  "My first photo",
  "Some cute thing",
  "There's a paparazzi around",
  "And of course... food!",
  "12/14",
  "12/17",
  "This is my first photo of the feed. this is a multi line comment for testing purposes. I am learning to code with #BreatheCode",
  "The internet approves this cute dog...#BreatheCode",
  "This is me waiting for the screen to show my awesome first website made at #BreatheCode",
  "Because no photo feed is cool without some food on it! #BreatheCode",
  'class="post"',
  'class="post-header"',
  'class="post-title"',
  'class="post-date"',
  'class="post-body"',
  "signal-horizontal.svg",
  "signal-stacked.svg",
];

for (const text of required) {
  const count = html.split(text).length - 1;
  if (count < 1) {
    fail(`missing text: ${text}`);
  }
}

const postCount = html.split('class="post"').length - 1;
if (postCount !== 4) {
  fail(`expected 4 posts, found ${postCount}`);
} else {
  pass("four posts reuse the post class");
}

if (!css.includes("display: flex") || !css.includes("justify-content: space-between")) {
  fail("feed header does not use flex left/right flow");
} else {
  pass("flex left/right flow");
}

if (!css.includes("margin-inline: auto")) {
  fail("column is not centered");
} else {
  pass("centered column");
}

const pairs = [
  ["#18202b", "#ffffff", 4.5, "ink on white"],
  ["#18202b", "#eaeaea", 4.5, "ink on feed canvas"],
  ["#505e70", "#ffffff", 4.5, "date on white"],
  ["#505e70", "#eaeaea", 4.5, "footer note on feed canvas"],
  ["#ffffff", "#b53a17", 4.5, "button label"],
  ["#a32a26", "#f7f8fa", 4.5, "error on canvas"],
  ["#164dcc", "#ffffff", 3, "focus on white"],
];

for (const [foreground, background, minimum, label] of pairs) {
  const ratio = contrast(foreground, background);
  if (ratio < minimum) {
    fail(`${label} contrast ${ratio.toFixed(2)} < ${minimum}`);
  } else {
    pass(`${label} contrast ${ratio.toFixed(2)}`);
  }
}

const hashes = {
  "assets/brand/signal-horizontal.svg":
    "85459232bf51e7bf7c94225fd4f2cd6b71a681b6d701cb4ffd6d2a142cf57a81",
  "assets/brand/signal-stacked.svg":
    "11314b300284db342bc15a7c7695c23199f65f68178af45586b62d01e9ea133a",
  "assets/signal/tokens.css":
    "9b1f68b4a44d79f0990778953c208af96c08e5bd8bd4f70b16697fbb24f51e52",
  "assets/signal/motion.css":
    "36b2f4d56439871d1ae46d4e2ad3e3d0d0b5da7a2700c503d4382247784b2f5c",
  "source/OFFICIAL_README.md":
    "6d3fe4d289ca827af904bde27b9a69d595d4c563ea45a0e850bf9c2d35658137",
  "source/OFFICIAL_README.es.md":
    "966bc8c6b3dfbf9f94d06bdbc678d553122693643ef8b8f735b92be4eb04d0d6",
  "source/learn.json":
    "01c68edf79622ee2f74c8ec49c03235a18b56e3cdff5ab87dc54ee4ceead928a",
};

for (const [relative, expected] of Object.entries(hashes)) {
  const digest = createHash("sha256").update(readFileSync(path.join(root, relative))).digest("hex");
  if (digest !== expected) {
    fail(`${relative} sha256 ${digest}`);
  } else {
    pass(`${relative} sha256`);
  }
}

run("npx", ["html-validate", "index.html", "404.html"]);
run("npx", ["stylelint", "styles.css"]);

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed`);
  process.exit(1);
}

console.log("\nAll validation checks passed");
