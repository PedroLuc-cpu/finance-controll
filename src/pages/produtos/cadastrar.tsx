"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AppHeader } from "@/layout/app-header";
import { AppSidebar } from "@/layout/app-sidebar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { GetStaticProps, InferGetServerSidePropsType } from "next";
import { schemaProduto } from "@/model/produtos";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";

type TProdutoCadastro = z.infer<typeof schemaProduto>;

const schemaMarca = z.object({
  id: z.string(),
  marca: z.string().min(4, { message: "Deve ter no minimo 4 caracteres" }),
});

const schemaCategorias = z.object({
  id: z.string(),
  categoria: z.string().min(4, { message: "Deve ter no minimo 4 caracteres" }),
});

export const getStaticProps = (async () => {
  const res_marca = await fetch(
    "http://localhost:3000/api/produtos/marca/listar"
  );
  const res_categoria = await fetch(
    "http://localhost:3000/api/produtos/categoria/listar"
  );
  const marcas: z.infer<typeof schemaMarca>[] = await res_marca.json();

  const categorias: z.infer<typeof schemaCategorias>[] =
    await res_categoria.json();

  return { props: { marcas, categorias } };
}) satisfies GetStaticProps<{
  marcas: z.infer<typeof schemaMarca>[];
  categorias: z.infer<typeof schemaCategorias>[];
}>;

export default function cadastrar({
  marcas,
  categorias,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const form = useForm<TProdutoCadastro>({
    resolver: zodResolver(schemaProduto),
    defaultValues: {
      nome: "",
      descricao: "",
      categoria: {
        id: "",
        nome: "",
      },
      codigoBarras: "",
      marca: {
        id: "",
        nome: "",
      },
      ncm: "",
      cest: "",
      cfop: "",
      origem: "",
      aliquotaICMS: 0,
      aliquotaIPI: 0,
      aliquotaPIS: 0,
      aliquotaCONFIS: 0,
      unidadeMedida: "",
      quantidadeEstoque: 0,
      precoCusto: 0,
      precoVenda: 0,
      lote: "",
      certficadoINMETRO: "",
      registroANVISA: "",
      avisoLegal: "",
      pesoBruto: 0,
      pesoLiquido: 0,
      dimensoes: {
        altura: 0,
        largura: 0,
        profundidade: 0,
      },
      tags: "",
    },
  });
  const router = useRouter();

  async function onSubmit(data: TProdutoCadastro) {
    try {
      await api.post("/produtos/cadastrar", {
        nome: data.nome,
        descricao: data.descricao,
        //categoriaId: ,
        codigoBarras: data.codigoBarras,
        //marcaId,
        fornecedorId: "70201d6d-52f2-4b63-913c-7eb9f4f0d389",
        unidadeMedida: data.unidadeMedida,
        quantidadeEstoque: data.quantidadeEstoque,
        precoCusto: data.precoCusto,
        precoVenda: data.precoVenda,
        dataValidade: "2025-12-31T00:00:00Z",
        lote: data.lote,
        dataFabricacao: "2023-06-15T00:00:00Z",
        certificadoINMETRO: data.certficadoINMETRO,
        registroANVISA: data.registroANVISA,
        avisoLegal: data.avisoLegal,
        pesoBruto: data.pesoBruto,
        pesoLiquido: data.pesoLiquido,
      });
      await router.push("/produtos/meus-produtos");
    } catch (error) {
      console.log(error);
    }
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 max-w-5xl mx-auto"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="codigoBarras"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código de Barras</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite o código de barras"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Produto</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite o nome do produto"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            O nome do produto deve ter pelo menos 10 caracteres.
                          </FormDescription>
                          <FormMessage />
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
                            placeholder="Digite a descrição do produto"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A descrição deve ter entre 10 e 160 caracteres.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="categoria.id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="eletronicos">
                                Eletrônicos
                              </SelectItem>
                              <SelectItem value="roupas">Roupas</SelectItem>
                              <SelectItem value="alimentos">
                                Alimentos
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="marca.id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marca</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite a marca" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="ncm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NCM</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o NCM" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEST</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o CEST" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cfop"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CFOP</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o CFOP" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="origem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Origem</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite a origem" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="aliquotaICMS"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alíquota ICMS (%)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite a alíquota ICMS"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="aliquotaIPI"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alíquota IPI (%)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite a alíquota IPI"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="aliquotaPIS"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alíquota PIS (%)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite a alíquota PIS"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="aliquotaCONFIS"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alíquota CONFIS (%)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite a alíquota CONFIS"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="unidadeMedida"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unidade de Medida</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite a unidade de medida"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="quantidadeEstoque"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade em Estoque</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite a quantidade em estoque"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="precoCusto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço de Custo</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite o preço de custo"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="precoVenda"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço de Venda</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite o preço de venda"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lote"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lote</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o lote" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="certficadoINMETRO"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Certificado INMETRO</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite o certificado INMETRO"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="registroANVISA"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registro ANVISA</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite o registro ANVISA"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="avisoLegal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Aviso Legal</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Digite o aviso legal"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <FormField
                      control={form.control}
                      name="pesoBruto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Peso Bruto (kg)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite o peso bruto"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pesoLiquido"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Peso Líquido (kg)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite o peso líquido"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dimensoes.altura"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Altura (cm)</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite a altura" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dimensoes.largura"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Largura (cm)</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite a largura" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dimensoes.profundidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profundidade (cm)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite a profundidade"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite as tags separadas por vírgula"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Registrar Produto</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
