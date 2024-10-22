"use client";
import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Produto } from "@/model/produtos";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
// import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Produto>[] = [
  {
    accessorKey: "id",
    header: "id",
    // id: "actions",
    // cell: ({ row }) => {
    //   const payment = row.original;

    //   return (
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild>
    //         <Button variant="ghost" className="h-8 w-8 p-0">
    //           <span>Open Menu</span>
    //           <MoreHorizontal className="h-4 w-4" />
    //         </Button>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent align="end">
    //         <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //         <DropdownMenuItem
    //           onClick={() =>
    //             navigator.clipboard.writeText(payment.id.toString())
    //           }
    //         >
    //           Copy product ID
    //         </DropdownMenuItem>
    //         <DropdownMenuSeparator />
    //         <DropdownMenuItem>View customer</DropdownMenuItem>
    //         <DropdownMenuItem>View product details</DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   );
    // },
  },
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
  },
  {
    accessorKey: "descricao",
    header: "descrição",
  },
  {
    accessorKey: "precoCusto",
    header: () => <div>Preço de Custo</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("precoCusto"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "precoVenda",
    header: () => <div>Preço</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("precoVenda"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantidadeEstoque",
    header: "Estoque",
    cell: ({ row }) => {
      return (
        <div
          className={row.original.quantidadeEstoque === 0 ? "text-red-500" : ""}
        >
          {row.original.quantidadeEstoque}
        </div>
      );
    },
  },
];
