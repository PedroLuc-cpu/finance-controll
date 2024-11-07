import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppHeader } from "@/layout/app-header";
import { AppSidebar } from "@/layout/app-sidebar";
import { Produto } from "@/model/produtos";
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
          <ScrollArea className="h-[calc(100vh-4rem)] w-full">
            <div className="container mx-auto py-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {produto?.nome || "Unnamed produto"}
                  </CardTitle>
                  <CardDescription>
                    {produto?.descricao || "No description available"}
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </div>
    </SidebarProvider>
  );
}
