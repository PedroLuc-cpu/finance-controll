"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AppHeader } from "@/layout/app-header";
import { AppSidebar } from "@/layout/app-sidebar";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const schemaProduto = z.object({
  nome: z.string().min(10, { message: "Deve ter no minimo 10 caracteres" }),
  descricao: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
  categoria: z.string(),
  codigoBarras: z.string(),
  marca: z.string(),

  ncm: z.string(),
  cest: z.string(),
  cfop: z.string(),
  origem: z.string(),
  aliquotaICMS: z.number(),
  aliquotaIPI: z.number(),
  aliquotaPIS: z.number(),
  aliquotaCONFIS: z.number(),

  fornecedor: z.object({
    id: z.string(),
    nome: z.string(),
    cnpj: z.string(),
    endereco: z.string(),
    telefone: z.string(),
  }),
  unidadeMedia: z.string(),
  quantidadeEstoque: z.number(),
  precoCusto: z.number(),
  precoVenda: z.number(),
  dataValidade: z.date(),
  lote: z.string(),
  dataFabricacao: z.date(),
  certficadoINMETRO: z.string(),

  registroANVISA: z.string(),
  avisoLegal: z.string(),

  pesoBruto: z.number(),
  pesoLiquido: z.number(),
  dimensoes: z.object({
    altura: z.number(),
    largura: z.number(),
    profundidade: z.number(),
  }),
  tags: z.string(),
});

export default function cadastrar() {
  const form = useForm<z.infer<typeof schemaProduto>>({
    resolver: zodResolver(schemaProduto),
  });

  function onSubmit(data: z.infer<typeof schemaProduto>) {
    console.log(data);
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <div>
          <AppHeader />
          <AppSidebar />
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="hidden flex-col md:flex">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Cadastrar produtos
                </h2>
              </div>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="py-4 space-y-8"
                  >
                    <Tabs defaultValue="informacoes">
                      <TabsList>
                        <TabsTrigger value="informacoes">
                          Informações
                        </TabsTrigger>
                        <TabsTrigger value="tributacoes">
                          Tributações
                        </TabsTrigger>
                        <TabsTrigger value="adicionais">Adicionais</TabsTrigger>
                      </TabsList>
                      <TabsContent value="tributacoes" className="space-y-2">
                        <div className="flex gap-2">
                          <FormField
                            control={form.control}
                            name="codigoBarras"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Codigos de barras</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="codigo de barra"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="nome do produto"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="descricao"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descrição</FormLabel>
                              <FormControl>
                                <Textarea
                                  className="resize-none"
                                  placeholder="descrição do produto"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-4">
                          <FormField
                            control={form.control}
                            name="marca"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <p className="cursor-pointer underline text-sm">
                                      marca
                                    </p>
                                  </DialogTrigger>
                                  <DialogContent className="dark:bg-zinc-900">
                                    <DialogHeader>
                                      <DialogTitle>Nova Marca</DialogTitle>
                                      <DialogDescription>
                                        Caso não tenha a marca desejada,
                                        cadastre aqui
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                          htmlFor="marca"
                                          className="text-right"
                                        >
                                          Marca
                                        </Label>
                                        <Input
                                          id="marca"
                                          className="col-span-3"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button type="button">
                                        Salvar alterações
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="escolha a marca do seu produto" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="cocacola">
                                      Coca Cola
                                    </SelectItem>
                                    <SelectItem value="reis">Reis</SelectItem>
                                    <SelectItem value="piracajuba">
                                      Piracajuba
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="categoria"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <p className="cursor-pointer underline text-sm">
                                      Categoria
                                    </p>
                                  </DialogTrigger>
                                  <DialogContent className="dark:bg-zinc-900">
                                    <DialogHeader>
                                      <DialogTitle>Nova Categoria</DialogTitle>
                                      <DialogDescription>
                                        Caso não tenha a categoria desejada,
                                        cadastre aqui
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                          htmlFor="marca"
                                          className="text-right"
                                        >
                                          Categoria
                                        </Label>
                                        <Input
                                          id="marca"
                                          className="col-span-3"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button type="button">
                                        Salvar alterações
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="escolha a categoria do seu produto" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Frios">Frios</SelectItem>
                                    <SelectItem value="Laticinios">
                                      Laticinios
                                    </SelectItem>
                                    <SelectItem value="Gelados">
                                      Gelados
                                    </SelectItem>
                                    <SelectItem value="Bebidas">
                                      Bebidas
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>
                      <TabsContent value="adicionais">
                        <div className="flex gap-4">
                          <FormField
                            control={form.control}
                            name="ncm"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Ncm</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="NCM do produto"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="cest"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Cest</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="CEST do produto"
                                    disabled={!form.watch("ncm")}
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="cfop"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Cfop</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="CFOP do produto"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="origem"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Origem</FormLabel>
                              <FormControl>
                                <Input placeholder="Origem" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-4 py-3">
                          <FormField
                            control={form.control}
                            name="aliquotaICMS"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>aliquota ICMS</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="aliquota ICMS"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="aliquotaIPI"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>aliquota IPI</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="aliquota IPI"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cfop"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>aliquota PIS</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="aliquota PIS"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cfop"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>aliquota COFINS</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="aliquota COFINS"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>
                      <TabsContent value="informacoes">
                        <FormField
                          control={form.control}
                          name="fornecedor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fornecedor</FormLabel>
                              <Select onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione um fornecedor" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="fornecedor@example.com">
                                    fornecedor@example.com
                                  </SelectItem>
                                  <SelectItem value="fornecedor@google.com">
                                    fornecedor@google.com
                                  </SelectItem>
                                  <SelectItem value="fornecedor@support.com">
                                    fornecedor@support.com
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="unidadeMedia"
                          render={({ field }) => (
                            <FormItem className="py-4">
                              <FormLabel>Unidade Media</FormLabel>
                              <Select onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione a unidade medida" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="kg">KG</SelectItem>
                                  <SelectItem value="und">UND</SelectItem>
                                  <SelectItem value="cx">CX</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                (ex: "kg", "unidade")
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-4">
                          <FormField
                            control={form.control}
                            name="precoCusto"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Preço de custo</FormLabel>
                                <FormControl>
                                  <Input placeholder="custo" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="precoVenda"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Preço Venda</FormLabel>
                                <FormControl>
                                  <Input placeholder="Venda" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="dataValidade"
                          render={({ field }) => (
                            <FormItem className="flex flex-col py-4">
                              <FormLabel>Data de validade</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "P")
                                      ) : (
                                        <span>Escolha data</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormDescription>
                                Para produtos perecíveis
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dataFabricacao"
                          render={({ field }) => (
                            <FormItem className="flex flex-col py-4">
                              <FormLabel>Data de fabricação</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "P")
                                      ) : (
                                        <span>Escolha data</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-4">
                          <FormField
                            control={form.control}
                            name="certficadoINMETRO"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>certficado inmetro</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="certficado inmetro"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Para produtos que precisam de certificação
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lote"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Lote</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Lote do produto"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="registroANVISA"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>registro da anvisa</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="registro da anvisa"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Para produtos regulados pela ANVISA (ex:
                                  medicamentos, cosméticos)
                                </FormDescription>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="avisoLegal"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>aviso legal</FormLabel>
                                <FormControl>
                                  <Input placeholder="aviso legal" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Avisos obrigatórios no rótulo, se houver{" "}
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex gap-4 py-4">
                          <FormField
                            control={form.control}
                            name="pesoBruto"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>peso bruto</FormLabel>
                                <FormControl>
                                  <Input placeholder="peso bruto" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Avisos obrigatórios no rótulo, se houver{" "}
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="pesoLiquido"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>peso liquido</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="peso liquido"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Avisos obrigatórios no rótulo, se houver{" "}
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                    <Button type="submit">Salvar</Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
