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
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { name: session.user.name as string },
    });
    if (!user) return res.status(404).json({ error: "User not found" });

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
    const messagesData = await Promise.all(
      messages.map(async (msg) => {
        const message = await gmail.users.messages.get({
          userId: "me",
          id: msg.id as string,
          
        })
        return {
          id: msg.id,
          snippet: message.data.snippet, // Resumo da mensagem
          payload: message.data.payload, // Dados completos da mensagem
        };
      })
    );

    res.status(200).json({ messages: messagesData });
  } catch (error) {
    console.error("Erro de permissão:", error);
    res.status(403).json({ error: "Permissão insuficiente" });
  }
}
