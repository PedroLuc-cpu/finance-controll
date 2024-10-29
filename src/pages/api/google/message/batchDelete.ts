import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma";
import { google } from "googleapis";
import { getGoogleAuthToken } from "@/lib/google";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { name: session.user.name as string },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const gmail = google.gmail({
      version: "v1",
      auth: await getGoogleAuthToken(user.id),
    });
    const Delete = gmail.users.messages.batchDelete({
      userId: user.id,
    });
    return res.status(201).json(Delete);
  } else {
    return res.status(200).json({ error: "Method invalid only POST" });
  }
}
