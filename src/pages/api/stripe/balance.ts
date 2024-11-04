import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json("Método não permitido");
  }
  try {
    const balance = await stripe.balance.retrieve();
    res.status(200).json({
      available: balance.available,
      pending: balance.pending,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao recuperar saldo" });
  }
}
