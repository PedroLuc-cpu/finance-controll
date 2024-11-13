import { schemaProduto } from "@/model/produtos";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Validar os dados com Zod
    const produtoData = schemaProduto.parse(req.body);

    const produto = await prisma.produto.create({
      data: {
        nome: produtoData.nome,
        descricao: produtoData.descricao,
        categoriaId: produtoData.categoria?.id || null,
        codigoBarras: produtoData.codigoBarras,
        marcaId: produtoData.marca?.id || null,
        ncm: produtoData.ncm || null,
        cest: produtoData.cest || null,
        cfop: produtoData.cfop || null,
        origem: produtoData.origem || null,
        aliquotaICMS: produtoData.aliquotaICMS,
        aliquotaIPI: produtoData.aliquotaIPI,
        aliquotaPIS: produtoData.aliquotaPIS,
        aliquotaCONFIS: produtoData.aliquotaCONFIS,
        unidadeMedida: produtoData.unidadeMedida,
        quantidadeEstoque: produtoData.quantidadeEstoque,
        precoCusto: produtoData.precoCusto,
        precoVenda: produtoData.precoVenda,
        lote: produtoData.lote || null,
        certificadoINMETRO: produtoData.certficadoINMETRO || null,
        registroANVISA: produtoData.registroANVISA || null,
        avisoLegal: produtoData.avisoLegal || null,
        pesoBruto: produtoData.pesoBruto,
        pesoLiquido: produtoData.pesoLiquido,
        dimensaoId: produtoData.dimensoes?.id ? produtoData.dimensoes.id : null,
        tags: produtoData.tags || null,
      },
    });

    // Responder com o produto criado
    return res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Ocorreu um erro ao criar o produto. Tente novamente mais tarde.",
    });
  }
}
