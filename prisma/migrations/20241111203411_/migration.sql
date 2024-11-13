/*
  Warnings:

  - You are about to drop the column `telefone` on the `Cliente` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Telefone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telefone" TEXT NOT NULL,
    "departamento" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dataNascimento" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "enderecoId" INTEGER,
    "telefoneId" INTEGER,
    CONSTRAINT "Cliente_telefoneId_fkey" FOREIGN KEY ("telefoneId") REFERENCES "Telefone" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cliente_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Cliente" ("createdAt", "dataNascimento", "documento", "email", "enderecoId", "id", "nome", "updatedAt") SELECT "createdAt", "dataNascimento", "documento", "email", "enderecoId", "id", "nome", "updatedAt" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
