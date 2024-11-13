import { z } from "zod";

export const schemaProduto = z.object({
  nome: z
    .string()
    .min(10, { message: "Nome deve ter no mínimo 10 caracteres" })
    .max(100, { message: "Nome não deve ter mais de 100 caracteres" }),

  descricao: z
    .string()
    .min(10, { message: "Descrição deve ter pelo menos 10 caracteres." })
    .max(160, { message: "Descrição não deve ter mais de 160 caracteres." }),

  categoria: z.object({
    id: z.string(),
    nome: z
      .string()
      .min(3, { message: "Categoria deve ter ao menos 3 caracteres." }),
  }).optional(),

  codigoBarras: z.string().regex(/^[0-9]{8,14}$/, {
    message: "Código de barras deve ter entre 8 e 14 dígitos numéricos.",
  }),

  marca: z.object({
    id: z.string(),
    nome: z
      .string()
      .min(2, { message: "Marca deve ter no mínimo 2 caracteres." }),
  }).optional(),

  ncm: z
    .string()
    .length(8, { message: "NCM deve ter exatamente 8 dígitos." })
    .regex(/^[0-9]+$/, { message: "NCM deve conter apenas números." })
    .optional(),

  cest: z
    .string()
    .length(7, { message: "CEST deve ter exatamente 7 dígitos." })
    .regex(/^[0-9]+$/, { message: "CEST deve conter apenas números." })
    .optional(),

  cfop: z
    .string()
    .length(4, { message: "CFOP deve ter exatamente 4 dígitos." })
    .regex(/^[0-9]+$/, { message: "CFOP deve conter apenas números." })
    .optional(),

  origem: z
    .string()
    .regex(/^[0-9]$/, { message: "Origem deve ser um número entre 0 e 9." })
    .optional(),

  aliquotaICMS: z.coerce
    .number()
    .min(0, { message: "Alíquota ICMS não deve ser negativa" })
    .max(100, { message: "Alíquota ICMS não deve exceder 100%" }),

  aliquotaIPI: z.coerce
    .number()
    .min(0, { message: "Alíquota IPI não deve ser negativa" })
    .max(100, { message: "Alíquota IPI não deve exceder 100%" }),

  aliquotaPIS: z.coerce
    .number()
    .min(0, { message: "Alíquota PIS não deve ser negativa" })
    .max(100, { message: "Alíquota PIS não deve exceder 100%" }),

  aliquotaCONFIS: z.coerce
    .number()
    .min(0, { message: "Alíquota CONFIS não deve ser negativa" })
    .max(100, { message: "Alíquota CONFIS não deve exceder 100%" }),

  unidadeMedida: z.coerce
    .string()
    .length(4, { message: "unidade medida deve ter exatamente 4 dígitos." }),

  quantidadeEstoque: z.coerce
    .number()
    .nonnegative({ message: "Quantidade em estoque não deve ser negativa." }),

  precoCusto: z.coerce
    .number()
    .nonnegative({ message: "Preço de custo não deve ser negativo." }),

  precoVenda: z.coerce
    .number()
    .nonnegative({ message: "Preço de venda não deve ser negativo." }),

  lote: z.string().optional(),

  certficadoINMETRO: z
    .string()
    .regex(/^[A-Za-z0-9-]*$/, {
      message:
        "Certificado INMETRO deve conter apenas letras, números ou hífens.",
    })
    .optional(),

  registroANVISA: z
    .string()
    .regex(/^[0-9]{13}$/, {
      message: "Registro ANVISA deve conter exatamente 13 dígitos numéricos.",
    })
    .optional(),
  avisoLegal: z.string().optional(),

  pesoBruto: z.coerce
    .number()
    .nonnegative({ message: "Peso bruto não deve ser negativo." }),

  pesoLiquido: z.coerce
    .number()
    .nonnegative({ message: "Peso líquido não deve ser negativo." }),

  dimensoes: z.object({
    id: z.string(),
    altura: z.coerce
      .number()
      .nonnegative({ message: "Altura não deve ser negativa." }),

    largura: z.coerce
      .number()
      .nonnegative({ message: "Largura não deve ser negativa." }),

    profundidade: z.coerce
      .number()
      .nonnegative({ message: "Profundidade não deve ser negativa." }),
  }).optional(),

  tags: z
    .string()
    .regex(/^[A-Za-z0-9, ]*$/, {
      message: "Tags devem conter apenas letras, números e vírgulas.",
    })
    .optional(),
});
