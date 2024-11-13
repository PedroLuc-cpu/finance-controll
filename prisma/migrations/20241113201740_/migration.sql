/*
  Warnings:

  - You are about to drop the column `npm` on the `Produto` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "categoriaId" TEXT,
    "codigoBarras" TEXT,
    "marcaId" TEXT,
    "fornecedorId" TEXT,
    "ncm" TEXT,
    "cest" TEXT,
    "cfop" TEXT,
    "origem" TEXT,
    "aliquotaICMS" REAL,
    "aliquotaIPI" REAL,
    "aliquotaPIS" REAL,
    "aliquotaCONFIS" REAL,
    "unidadeMedida" TEXT NOT NULL,
    "quantidadeEstoque" INTEGER NOT NULL,
    "precoCusto" REAL NOT NULL,
    "precoVenda" REAL NOT NULL,
    "dataValidade" DATETIME,
    "lote" TEXT,
    "dataFabricacao" DATETIME,
    "certificadoINMETRO" TEXT,
    "registroANVISA" TEXT,
    "avisoLegal" TEXT,
    "dimensaoId" TEXT,
    "pesoBruto" REAL,
    "pesoLiquido" REAL,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Produto_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Produto_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Produto_dimensaoId_fkey" FOREIGN KEY ("dimensaoId") REFERENCES "Dimensao" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("aliquotaCONFIS", "aliquotaICMS", "aliquotaIPI", "aliquotaPIS", "avisoLegal", "categoriaId", "certificadoINMETRO", "cest", "cfop", "codigoBarras", "createdAt", "dataFabricacao", "dataValidade", "descricao", "dimensaoId", "fornecedorId", "id", "lote", "marcaId", "nome", "origem", "pesoBruto", "pesoLiquido", "precoCusto", "precoVenda", "quantidadeEstoque", "registroANVISA", "tags", "unidadeMedida", "updatedAt") SELECT "aliquotaCONFIS", "aliquotaICMS", "aliquotaIPI", "aliquotaPIS", "avisoLegal", "categoriaId", "certificadoINMETRO", "cest", "cfop", "codigoBarras", "createdAt", "dataFabricacao", "dataValidade", "descricao", "dimensaoId", "fornecedorId", "id", "lote", "marcaId", "nome", "origem", "pesoBruto", "pesoLiquido", "precoCusto", "precoVenda", "quantidadeEstoque", "registroANVISA", "tags", "unidadeMedida", "updatedAt" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
