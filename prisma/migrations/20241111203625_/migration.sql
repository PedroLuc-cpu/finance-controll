/*
  Warnings:

  - The primary key for the `Cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Endereco` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Telefone` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dataNascimento" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "enderecoId" TEXT,
    "telefoneId" TEXT,
    CONSTRAINT "Cliente_telefoneId_fkey" FOREIGN KEY ("telefoneId") REFERENCES "Telefone" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cliente_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Cliente" ("createdAt", "dataNascimento", "documento", "email", "enderecoId", "id", "nome", "telefoneId", "updatedAt") SELECT "createdAt", "dataNascimento", "documento", "email", "enderecoId", "id", "nome", "telefoneId", "updatedAt" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
CREATE TABLE "new_Endereco" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL
);
INSERT INTO "new_Endereco" ("bairro", "cep", "cidade", "clienteId", "estado", "id", "numero", "rua") SELECT "bairro", "cep", "cidade", "clienteId", "estado", "id", "numero", "rua" FROM "Endereco";
DROP TABLE "Endereco";
ALTER TABLE "new_Endereco" RENAME TO "Endereco";
CREATE TABLE "new_Telefone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telefone" TEXT NOT NULL,
    "departamento" TEXT NOT NULL
);
INSERT INTO "new_Telefone" ("departamento", "id", "telefone") SELECT "departamento", "id", "telefone" FROM "Telefone";
DROP TABLE "Telefone";
ALTER TABLE "new_Telefone" RENAME TO "Telefone";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
