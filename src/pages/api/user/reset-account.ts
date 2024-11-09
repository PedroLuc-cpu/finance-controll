import { sendEmail } from "@/lib/mailtrap";
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { prisma } from "@/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(404).json({
      message: "Method not supported",
    });
  }
  const { email } = req.body;
  const resetCode = crypto.randomInt(100000, 999999).toString();

  await prisma.user.update({
    where: { email },
    data: {
      passwordResetCode: resetCode,
      passwordResetExpires: new Date(Date.now() + 3 * 60 * 1000),
    },
  });

  const htmlContent = `
  <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperação de Senha</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        .code {
            font-size: 24px;
            font-weight: bold;
            color: #22C55E;
            text-align: center;
            margin: 20px 0;
            padding: 10px;
            background-color: #f0f0f0;
            border-radius: 8px;
        }
        .btn {
            display: block;
            width: 100%;
            text-align: center;
            background-color: #22C55E;
            color: #ffffff;
            padding: 12px 0;
            text-decoration: none;
            font-weight: bold;
            border-radius: 8px;
            margin-top: 20px;
        }
        p {
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Recuperação de Senha</h1>
        <p>Olá,</p>
        <p>Recebemos uma solicitação para redefinir a senha da sua conta. Utilize o código abaixo para completar o processo de recuperação:</p>
        <div class="code">${resetCode}</div>
        <p>Se você não solicitou essa alteração, por favor ignore este e-mail.</p>
        <p>Para redefinir sua senha diretamente, clique no link abaixo:</p>
        <a href="http://localhost:3000/recoverycode" class="btn">Redefinir Senha</a>
        <p>Atenciosamente, <br>Equipe de Suporte</p>
    </div>
</body>
</html>
`;

  await sendEmail(email, "Esqueceu a senha", htmlContent);

  return res.status(200).json({
    message: `Email enviado para o ${email}`,
  });
}
