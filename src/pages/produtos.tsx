import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/layout/app-header";
import { AppSidebar } from "@/layout/app-sidebar";
import { columns } from "./components/payments/columns";
import { DataTable } from "./components/payments/data-table";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import { Produto } from "@/model/produtos";

export const getStaticProps = (async (context) => {
  const res = await fetch("http://localhost:3000/api/produtos/todosprodutos");
  const produto: Produto[] = await res.json();
  return {
    props: {
      produto,
    },
  };
}) satisfies GetStaticProps<{
  produto: Produto[];
}>;

export default function Produtos({
  produto,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  console.log(produto);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <div className="flex flex-col">
          <AppHeader />
          <AppSidebar />
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <main className="container mx-auto py-10">
            <DataTable columns={columns} data={produto} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
