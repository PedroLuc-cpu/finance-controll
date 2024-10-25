import { getGoogleAuthToken } from "@/lib/google";
import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { name: session.user.name as string },
  });
  if (!user) return res.status(404).json({ error: "User not found" });

  console.log(user);

  const gmail = google.calendar({
    version: "v3",
    auth: await getGoogleAuthToken("cm2mb3p7i0004c3ba4j6my3g7"),
  });

  try {
    const result = await gmail.calendarList.get({
      calendarId: "primary",
    });

    const messages = result.data;
    if (!messages) {
      return res.status(200).json({ message: "No messages found." });
    }
    res.status(200).json({ messages });
  } catch (error) {
    console.error("Erro de permissão:", error);
    res.status(403).json({ error: "Permissão insuficiente" });
  }
}
