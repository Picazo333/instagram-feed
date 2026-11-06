#!/usr/bin/env python3
"""Static server for the photo feed. Unknown paths return 404.html with status 404."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PORT = 4173


class FeedHandler(SimpleHTTPRequestHandler):
    # HTTP/1.1 so Chrome can reuse the connection. HTTP/1.0 closed it after
    # every file, and the lab then paid a fresh handshake per image.
    protocol_version = "HTTP/1.1"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("X-Robots-Tag", "noindex")
        super().end_headers()

    def _resolve(self):
        request_path = self.path.split("?", 1)[0]
        if request_path in ("", "/"):
            return "index"
        relative = request_path.lstrip("/")
        target = (ROOT / relative).resolve()
        try:
            target.relative_to(ROOT)
        except ValueError:
            return "missing"
        return "file" if target.is_file() else "missing"

    def do_GET(self):
        kind = self._resolve()
        if kind == "missing":
            self._send_missing()
            return
        super().do_GET()

    def do_HEAD(self):
        kind = self._resolve()
        if kind == "missing":
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str((ROOT / "404.html").stat().st_size))
            self.send_header("X-Robots-Tag", "noindex")
            self.end_headers()
            return
        super().do_HEAD()

    def _send_missing(self):
        body = (ROOT / "404.html").read_bytes()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("X-Robots-Tag", "noindex")
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", PORT), FeedHandler)
    print(f"http://127.0.0.1:{PORT}")
    server.serve_forever()
