"use client";

import { Produto } from "@/model/produtos";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Produto>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "description",
    header: "descrição",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "inStock",
    header: "Em Estoque",
  },
];
