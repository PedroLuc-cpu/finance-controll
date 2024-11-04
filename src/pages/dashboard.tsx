"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/layout/app-header";
import { AppSidebar } from "@/layout/app-sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import Image from "next/image";
import { accounts } from "@/components/mail/data";
import { Mail } from "@/components/mail/components/mail";
import { GoogleAPI } from "@/services/API/googleApi/inbox";
import { useEffect, useState } from "react";
import type { Mails } from "@/model/email";
import { z } from "zod";

const schemaBalance = z.object({
  available: z.array(
    z.object({
      amoun: z.number(),
      currency: z.string(),
      source_types: z.object({
        card: z.number(),
      }),
    })
  ),
  pending: z.array(
    z.object({
      amoun: z.number(),
      currency: z.string(),
      source_types: z.object({
        card: z.number(),
      }),
    })
  ),
});

type balanceType = z.infer<typeof schemaBalance>;

export default function dashboard() {
  const { setTheme } = useTheme();
  const [emails, setEmail] = useState<Mails[]>([]);
  const [balance, setBalance] = useState<balanceType>();

  useEffect(() => {
    GoogleAPI.getGoogleInboxAPI().then((response) => {
      setEmail(response?.data);
    });
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/stripe/balance"
        );
        if (!response.ok) {
          throw new Error("Erro ao obeter o salto");
        }
        const data = await response.json();
        setBalance(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBalance();
  }, []);

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
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                  <CalendarDateRangePicker />
                  <Button>Download</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Visão geral</TabsTrigger>
                  <TabsTrigger value="inbox">Notificações</TabsTrigger>
                  <TabsTrigger value="reports">Relatórios</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Receita total{" "}
                        </CardTitle>
                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-4 w-4 text-muted-foreground"
                        >
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ${balance?.available[0].amoun ?? 0}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          +20.1% do mês passado
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Cartão
                        </CardTitle>
                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-4 w-4 text-muted-foreground"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ${balance?.available[0].source_types.card ?? 0}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          +180.1% do mês passado
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Vendas
                        </CardTitle>
                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-4 w-4 text-muted-foreground"
                        >
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <path d="M2 10h20" />
                        </svg>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">
                          +19% do mês passado
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Ativo agora{" "}
                        </CardTitle>
                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-4 w-4 text-muted-foreground"
                        >
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">
                          +201 desde a última hora
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                      <CardHeader>
                        <CardTitle>Visão geral</CardTitle>
                      </CardHeader>
                      <CardContent className="pl-2">
                        <Overview />
                      </CardContent>
                    </Card>
                    <Card className="col-span-3">
                      <CardHeader>
                        <CardTitle>Vendas recentes</CardTitle>
                        <CardDescription>
                          Você fez 265 vendas este mês.{" "}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <RecentSales />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="inbox" className="space-y-4">
                  <>
                    <div className="md:hidden">
                      <Image
                        src="/examples/mail-dark.png"
                        width={1280}
                        height={727}
                        alt="Mail"
                        className="hidden dark:block"
                      />
                      <Image
                        src="/examples/mail-light.png"
                        width={1280}
                        height={727}
                        alt="Mail"
                        className="block dark:hidden"
                      />
                    </div>
                    <div className="hidden flex-col md:flex">
                      <Mail
                        accounts={accounts}
                        mails={emails}
                        navCollapsedSize={4}
                        defaultLayout={undefined}
                      />
                    </div>
                  </>
                </TabsContent>
                <TabsContent value="reports">
                  <h1>Relatorios</h1>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
