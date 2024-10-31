import { GET, POST } from "@/config/api/methods";
import { MethodNotAllowed } from "@/config/api/responses";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === GET) {
    return res.json({ message: "GET HELLO WORKING" });
  }

  if (req.method === POST) {
    return res.json({ message: "POST HELLO WORKING" });
  }

  res.setHeader("Allow", [GET, POST]);
  return res.status(MethodNotAllowed).end(`Method ${req.method} Not Allowed`);
}

export default handler;
