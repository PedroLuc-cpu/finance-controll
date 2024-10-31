"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Produto } from "@/model/produtos";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface DataTableProps {
  columns: ColumnDef<Produto, unknown>[];
  data: Produto[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const fetchProduto = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/produtos/${id}`);
      const produto = await response.json();
      setSelectedProduto(produto);
    } catch (error) {
      console.error("Erro ao buscar o produto:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (produtoId: number) => {
    fetchProduto(produtoId);
    setIsOpenDialog(true);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div>
      <div className="flex items-center py-4 gap-2 justify-between">
        <Input
          className="max-w-sm"
          placeholder="Filtrar seu produto"
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("nome")?.setFilterValue(e.target.value)
          }
        />
        <Link href={"/produtos/cadastrar"}>
          <Button>Cadastrar</Button>
        </Link>
      </div>
      <div className="rounded-md border">
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
          <DialogContent className="sm:max-w-max dark:bg-[#151515]">
            <DialogHeader>
              <DialogTitle>Informações do produto</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[80vh] pr-4">
              <div className="grid gap-4 py-4">
                <section>
                  <h3 className="mb-2 text-lg font-semibold">
                    Informações Básicas
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <strong>ID:</strong> {selectedProduto?.id}
                    </div>
                    <div>
                      <strong>Nome:</strong> {selectedProduto?.nome}
                    </div>
                    <div>
                      <strong>Descrição:</strong> {selectedProduto?.descricao}
                    </div>
                    <div>
                      <strong>Categoria:</strong> {selectedProduto?.categoria}
                    </div>
                    <div>
                      <strong>Marca:</strong> {selectedProduto?.marca}
                    </div>
                    <div>
                      <strong>Código de Barras:</strong>{" "}
                      {selectedProduto?.codigoBarras}
                    </div>
                  </div>
                </section>
                <Separator />

                <section>
                  <h3 className="mb-2 text-lg font-semibold">
                    Informações Fiscais
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <strong>NCM:</strong> {selectedProduto?.ncm}
                    </div>
                    <div>
                      <strong>CFOP:</strong> {selectedProduto?.cfop}
                    </div>
                    <div>
                      <strong>Origem:</strong> {selectedProduto?.origem}
                    </div>
                    <div>
                      <strong>Alíquota ICMS:</strong>{" "}
                      {selectedProduto?.aliquotaICMS}%
                    </div>
                    <div>
                      <strong>Alíquota PIS:</strong>{" "}
                      {selectedProduto?.aliquotaPIS}%
                    </div>
                    <div>
                      <strong>Alíquota COFINS:</strong>{" "}
                      {selectedProduto?.aliquotaCOFINS}%
                    </div>
                  </div>
                </section>
                <Separator />
                <section>
                  <h3 className="mb-2 text-lg font-semibold">
                    Informações do Fornecedor
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <strong>Nome:</strong> {selectedProduto?.fornecedor.nome}
                    </div>
                    <div>
                      <strong>CNPJ:</strong> {selectedProduto?.fornecedor.cnpj}
                    </div>
                    <div>
                      <strong>Endereço:</strong>{" "}
                      {selectedProduto?.fornecedor.endereco}
                    </div>
                    <div>
                      <strong>Telefone:</strong>{" "}
                      {selectedProduto?.fornecedor.telefone}
                    </div>
                  </div>
                </section>
                <Separator />
                <section>
                  <h3 className="mb-2 text-lg font-semibold">
                    Informações de Estoque e Preço
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <strong>Unidade de Medida:</strong>{" "}
                      {selectedProduto?.unidadeMedida}
                    </div>
                    <div>
                      <strong>Quantidade em Estoque:</strong>{" "}
                      {selectedProduto?.quantidadeEstoque}
                    </div>
                    <div>
                      <strong>Preço de Custo:</strong>{" "}
                      {formatCurrency(selectedProduto?.precoCusto ?? 0)}
                    </div>
                    <div>
                      <strong>Preço de Venda:</strong>{" "}
                      {formatCurrency(selectedProduto?.precoVenda ?? 0)}
                    </div>
                    {/* <div>
                      <strong>Data de Validade:</strong>{" "}
                      {formatDate(selectedProduto?.dataValidade)}
                    </div> */}
                  </div>
                </section>
              </div>
            </ScrollArea>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Fechar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="p-4 cursor-pointer"
                      onClick={() => handleRowClick(parseInt(row.original.id))}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-lg font-bold"
                >
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
