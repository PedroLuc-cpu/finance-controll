import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppHeader } from "@/layout/app-header";
import { AppSidebar } from "@/layout/app-sidebar";
import { Produto } from "@/model/produtos";
import { TabsContent } from "@radix-ui/react-tabs";
import { format } from "date-fns";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";

export const getStaticPaths = (async () => {
  const res = await fetch("http://localhost:3000/api/produtos/todosprodutos");
  const produtos: Produto[] = await res.json();
  const paths = produtos.map((produtos) => ({
    params: {
      id: produtos.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/produtos/${params?.id}`);
  const produto: Produto = await res.json();
  return { props: { produto } };
}) satisfies GetStaticProps<{
  produto: Produto;
}>;

const formatDate = (date: Date | undefined) => {
  return date ? format(new Date(date), "dd/MM/yyyy") : "N/A";
};
export default function page({
  produto,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const router = useRouter();

  return (
    <SidebarProvider>
      <div>
        <AppHeader />
        <AppSidebar />
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center">
          <Button onClick={() => router.back()}>Voltar</Button>
        </div>
        <div>
          <div className="container mx-auto py-6">
            <Card>
              <CardHeader>
                <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  {produto?.nome || "Produto sem nome"}
                </CardTitle>
                <CardDescription>
                  {produto?.descricao || "Nenhuma descrição"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="space-y-2">
                    <Label>Codigo de Barras</Label>
                    <Input
                      value={produto.codigoBarras}
                      className="disabled:cursor-default"
                      disabled
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label>Nome</Label>
                    <Input value={produto.nome} />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Input value={produto.categoria || "-"} />
                  </div>
                  <div className="space-y-2">
                    <Label>Marca</Label>
                    <Input value={produto.marca || "-"} />
                  </div>
                </div>
                <Separator className="mt-4" />
                <p className="font-bold text-lg py-4">Tributação</p>
                <div className="flex gap-4">
                  <div className="space-y-2 flex-1">
                    <Label>NCM</Label>
                    <Input value={produto.ncm || "-"} />
                  </div>

                  <div className="space-y-2 flex-1">
                    <Label>Cest</Label>
                    <Input value={produto.cest || "-"} />
                  </div>

                  <div className="space-y-2 flex-1">
                    <Label>Cfop</Label>
                    <Input value={produto.cfop || "-"} />
                  </div>

                  <div className="space-y-2 flex-1">
                    <Label>Origem</Label>
                    <Input value={produto.origem || "-"} />
                  </div>
                </div>

                <p className="font-bold text-lg my-4">Aliquotas</p>
                <div className="flex gap-4">
                  <div className="space-y-2 flex-1">
                    <Label>ICMS</Label>
                    <Input value={produto.aliquotaICMS || "-"} />
                  </div>

                  <div className="space-y-2 flex-1">
                    <Label>IPI</Label>
                    <Input value={produto.aliquotaIPI || "-"} />
                  </div>

                  <div className="space-y-2 flex-1">
                    <Label>PIS</Label>
                    <Input value={produto.aliquotaPIS || "-"} />
                  </div>

                  <div className="space-y-2 flex-1">
                    <Label>COFINS</Label>
                    <Input value={produto.aliquotaCOFINS || "-"} />
                  </div>

                  <div className="space-y-2 flex-1">
                    <Label>aliquota ICMS</Label>
                    <Input value={produto.aliquotaICMS || "-"} />
                  </div>
                </div>

                <div className="py-4">
                  <Tabs defaultValue="infor_estoque">
                    <TabsList>
                      <TabsTrigger value="infor_estoque">
                        Informações de Estoque
                      </TabsTrigger>
                      <TabsTrigger value="infor_adicionais">
                        Informações Adicionais
                      </TabsTrigger>
                      <TabsTrigger value="outros">Outros</TabsTrigger>
                    </TabsList>
                    <div className="py-4">
                      <TabsContent value="infor_estoque">
                        <div className="flex gap-4">
                          <div className="space-y-2 flex-1">
                            <Label>Unidade Medida</Label>
                            <Input value={produto.unidadeMedida} />
                          </div>

                          <div className="space-y-2 flex-1">
                            <Label>Quantidade</Label>
                            <Input value={produto.quantidadeEstoque} />
                          </div>

                          <div className="space-y-2 flex-1">
                            <Label>Preço de custo</Label>
                            <Input
                              value={new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(produto.precoCusto)}
                            />
                          </div>

                          <div className="space-y-2 flex-1">
                            <Label>Preço de Venda</Label>
                            <Input
                              value={new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(produto.precoVenda)}
                            />
                          </div>

                          <div className="space-y-2 flex-1">
                            <Label>Data de Validade</Label>
                            <Input value={formatDate(produto.dataValidade)} />
                          </div>
                        </div>{" "}
                      </TabsContent>
                      <TabsContent value="infor_adicionais">
                        <div className="flex gap-4">
                          <div className="space-y-2 flex-1">
                            <Label>Lote</Label>
                            <Input value={produto.lote} />
                          </div>

                          <div className="space-y-2 flex-1">
                            <Label>Data de Fabricação</Label>
                            <Input value={formatDate(produto.dataFabricacao)} />
                          </div>

                          <div className="space-y-2 flex-1">
                            <Label>Certificado Inmetro</Label>
                            <Input value={produto.certificadoINMETRO} />
                          </div>

                          <div className="space-y-2 flex-1">
                            <Label>Registro Anvisa</Label>
                            <Input value={produto.registroANVISA} />
                          </div>

                          <div className="space-y-2 flex-1">
                            <Label>Aviso Legal</Label>
                            <Input value={produto.avisoLegal} />
                          </div>
                        </div>{" "}
                      </TabsContent>
                      <TabsContent value="outros">
                        <div className="flex gap-4">
                          <div className="space-y-2 flex-1">
                            <Label>Peso Bruto</Label>
                            <Input value={produto.pesoBruto} />
                          </div>

                          <div className="space-y-2 flex-1">
                            <Label>Peso Liquido</Label>
                            <Input value={produto.pesoLiquido} />
                          </div>

                          <div className="space-y-2 flex-1">
                            <Label>Altura</Label>
                            <Input value={produto.dimensoes?.altura || "-"} />
                          </div>

                          <div className="space-y-2 flex-1">
                            <Label>Largura</Label>
                            <Input value={produto.dimensoes?.largura || "-"} />
                          </div>

                          <div className="space-y-2 flex-1">
                            <Label>Profundidade</Label>
                            <Input
                              value={produto.dimensoes?.profundidade || "-"}
                            />
                          </div>
                        </div>{" "}
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
