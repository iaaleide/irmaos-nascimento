import { handleApi } from "../server/store.mjs";

export default async function handler(req, res) {
  await handleApi(req, res, "/api/stats/reset");
}
