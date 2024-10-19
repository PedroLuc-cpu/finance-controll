import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppHeader } from "@/layout/app-header";
import { AppSidebar } from "@/layout/app-sidebar";

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  ListFilter,
  MoreVertical,
  Truck,
} from "lucide-react";

export default function Orders() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <div className="flex flex-col">
          <AppHeader />
          <AppSidebar />
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <main className="grid flex-1 items-start gap-4 p-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                  <CardHeader className="pb-3">
                    <CardTitle>Seus Pedidos</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      Apresentando nosso painel dinâmico de pedidos para
                      gerenciamento contínuo e análise criteriosa..
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button>Criar novo pedido</Button>
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-1">
                  <CardHeader className="pb-2">
                    <CardDescription>Essa semana</CardDescription>
                    <CardTitle className="text-4xl">$1,329</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      +25% da semana passada
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={25} aria-label="25% increase" />
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                  <CardHeader className="pb-2">
                    <CardDescription>Este mês</CardDescription>
                    <CardTitle className="text-4xl">$5,329</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      +10% do mês passado
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={12} aria-label="12% increase" />
                  </CardFooter>
                </Card>
              </div>
              <Tabs defaultValue="week">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="week">Semana</TabsTrigger>
                    <TabsTrigger value="month">Mês</TabsTrigger>
                    <TabsTrigger value="year">Ano</TabsTrigger>
                  </TabsList>
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-sm"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only">
                            Filtrar
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Cumprido
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Recusado
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Reembolsado
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-sm"
                    >
                      <File className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Exportar</span>
                    </Button>
                  </div>
                </div>
                <TabsContent value="week">
                  <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                      <CardTitle>Pedidos</CardTitle>
                      <CardDescription>
                        Pedidos recentes de sua loja.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Cliente</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Tipo
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Data
                            </TableHead>
                            <TableHead className="text-right">
                              Quantia
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="bg-accent">
                            <TableCell>
                              <div className="font-medium">Liam Johnson</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                liam@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              SaOfertale
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                Cumprido
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-23
                            </TableCell>
                            <TableCell className="text-right">
                              $250.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Olivia Smith</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                olivia@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Reembolso
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="outline">
                                Recusado
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-24
                            </TableCell>
                            <TableCell className="text-right">
                              $150.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Noah Williams</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                noah@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Subscrição
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                Cumprido
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-25
                            </TableCell>
                            <TableCell className="text-right">
                              $350.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Emma Brown</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                emma@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Oferta
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                Cumprido
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-26
                            </TableCell>
                            <TableCell className="text-right">
                              $450.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Liam Johnson</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                liam@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Oferta
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                Cumprido
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-23
                            </TableCell>
                            <TableCell className="text-right">
                              $250.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Liam Johnson</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                liam@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Oferta
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                Cumprido
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-23
                            </TableCell>
                            <TableCell className="text-right">
                              $250.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Olivia Smith</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                olivia@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Reembolso
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="outline">
                                Recusado
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-24
                            </TableCell>
                            <TableCell className="text-right">
                              $150.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Emma Brown</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                emma@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Oferta
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                Cumprido
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-26
                            </TableCell>
                            <TableCell className="text-right">
                              $450.00
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Ordem Oe31b70H
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copiar ID do pedido</span>
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Data: 23 de novembro de 2023
                    </CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                      <Truck className="h-3.5 w-3.5" />
                      <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                        Rastrear pedido
                      </span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                          <span className="sr-only">Mais</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Exportar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Lixo</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold">Detalhes do pedido</div>
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Lâmpadas brilhantes x <span>2</span>
                        </span>
                        <span>$250.00</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Aqua Filters x <span>1</span>
                        </span>
                        <span>$49.00</span>
                      </li>
                    </ul>
                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>$299.00</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Envio</span>
                        <span>$5.00</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Imposto</span>
                        <span>$25.00</span>
                      </li>
                      <li className="flex items-center justify-between font-semibold">
                        <span className="text-muted-foreground">Total</span>
                        <span>$329.00</span>
                      </li>
                    </ul>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <div className="font-semibold">Informações de envio</div>
                      <address className="grid gap-0.5 not-italic text-muted-foreground">
                        <span>Liam Johnson</span>
                        <span>1234 Main St.</span>
                        <span>Anytown, CA 12345</span>
                      </address>
                    </div>
                    <div className="grid auto-rows-max gap-3">
                      <div className="font-semibold">
                        Informações de pagamento
                      </div>
                      <div className="text-muted-foreground">
                        Igual ao endereço de entrega
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Informações do cliente</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Cliente</dt>
                        <dd>Liam Johnson</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Email</dt>
                        <dd>
                          <a href="mailto:">liam@acme.com</a>
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Telefone</dt>
                        <dd>
                          <a href="tel:">+1 234 567 890</a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">
                      Informações de pagamento
                    </div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <CreditCard className="h-4 w-4" />
                          Visa
                        </dt>
                        <dd>**** **** **** 4532</dd>
                      </div>
                    </dl>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    Atualizado{" "}
                    <time dateTime="2023-11-23">23 de novembro de 2023</time>
                  </div>
                  <Pagination className="ml-auto mr-0 w-auto">
                    <PaginationContent>
                      <PaginationItem>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                          <span className="sr-only">Pedido anterior</span>
                        </Button>
                      </PaginationItem>
                      <PaginationItem>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                          <span className="sr-only">Próximo pedido</span>
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
