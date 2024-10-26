import { getGoogleAuthToken } from "@/lib/google";
import { gmail_v1, google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Email } from "@/model/email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Email[] | { message: string }>
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { name: session.user.name as string },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log(user);

    const gmail = google.gmail({
      version: "v1",
      auth: await getGoogleAuthToken(user.id),
    });

    const messagesResponse = await gmail.users.messages.list({
      userId: "me",
      labelIds: ["INBOX"], // Filtra mensagens apenas da caixa de entrada
      maxResults: 10, // Limita o número de resultados (ajuste conforme necessário)
    });

    const messages = messagesResponse.data.messages;
    if (!messages || messages.length === 0) {
      return res.status(200).json({ message: "No messages found in inbox." });
    }

    // Obter o conteúdo de cada mensagem
    const messagesData: Email[] = await Promise.all(
      messages.map(async (msg) => {
        const message = await gmail.users.messages.get({
          userId: "me",
          id: msg.id as string,
        });
        return {
          id: msg.id as string,
          snippet: message.data.snippet as string,
          payload: message.data.payload as gmail_v1.Schema$MessagePart,
        };
      })
    );

    res.status(200).json(messagesData);
  } catch (error) {
    console.error("Erro de permissão:", error);
    res.status(403).json({ message: "Permissão insuficiente" });
  }
}
