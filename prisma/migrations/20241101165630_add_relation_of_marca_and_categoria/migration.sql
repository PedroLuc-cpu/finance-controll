/*
  Warnings:

  - You are about to drop the column `categoria` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `marca` on the `Produto` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Marca" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "marca" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoria" TEXT NOT NULL
);

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
    "fornecedorId" TEXT NOT NULL,
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
    "pesoBruto" REAL,
    "pesoLiquido" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Produto_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Produto_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("avisoLegal", "certificadoINMETRO", "codigoBarras", "createdAt", "dataFabricacao", "dataValidade", "descricao", "fornecedorId", "id", "lote", "nome", "pesoBruto", "pesoLiquido", "precoCusto", "precoVenda", "quantidadeEstoque", "registroANVISA", "unidadeMedida", "updatedAt") SELECT "avisoLegal", "certificadoINMETRO", "codigoBarras", "createdAt", "dataFabricacao", "dataValidade", "descricao", "fornecedorId", "id", "lote", "nome", "pesoBruto", "pesoLiquido", "precoCusto", "precoVenda", "quantidadeEstoque", "registroANVISA", "unidadeMedida", "updatedAt" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
