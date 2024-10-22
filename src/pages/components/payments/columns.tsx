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
    accessorKey: "name",
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
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "description",
    header: "descrição",
  },
  {
    accessorKey: "price",
    header: () => <div>Preço</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "inStock",
    header: "Em Estoque",
    cell: ({ row }) => {
      return (
        <div
          className={
            row.original.inStock === true ? "text-green-500" : "text-red-500"
          }
        >
          {row.original.inStock === true ? "Em estoque" : "Sem estoque"}
        </div>
      );
    },
  },
];
