import { handleApi } from "../server/store.mjs";

export default async function handler(req, res) {
  const method = req.method || "GET";
  // Map this file to /api/config for GET and PUT
  if (method === "PUT" || method === "GET" || method === "OPTIONS") {
    await handleApi(req, res, "/api/config");
    return;
  }
  res.statusCode = 405;
  res.end("Method not allowed");
}
