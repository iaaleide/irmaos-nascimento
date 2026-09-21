import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleApi } from "../server/store.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT || 43147);
const host = process.env.HOST || "0.0.0.0";

const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function resolveFile(urlPath) {
  const decoded = decodeURIComponent((urlPath || "/").split("?")[0]);
  if (decoded === "/admin" || decoded.startsWith("/admin/")) {
    return path.join(root, "index.html");
  }
  const relative = decoded.endsWith("/") ? `${decoded}index.html` : decoded;
  const candidate = path.normalize(path.join(root, relative));
  if (!candidate.startsWith(root)) return null;
  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  const asHtml = `${candidate}.html`;
  if (fs.existsSync(asHtml)) return asHtml;
  const asIndex = path.join(candidate, "index.html");
  if (fs.existsSync(asIndex)) return asIndex;
  return path.join(root, "index.html");
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Connection", "close");
  res.setHeader("Cache-Control", "no-store");

  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  if (url.pathname.startsWith("/api/")) {
    await handleApi(req, res, url.pathname);
    return;
  }

  const file = resolveFile(url.pathname);
  if (!file || !fs.existsSync(file)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Não encontrado");
    return;
  }
  const type = mime[path.extname(file).toLowerCase()] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": type });
  fs.createReadStream(file).pipe(res);
});

server.keepAliveTimeout = 0;
server.listen(port, host, () => {
  console.log(`Irmãos Nascimento em http://${host}:${port}`);
  console.log(`Admin em http://${host}:${port}/admin`);
});
