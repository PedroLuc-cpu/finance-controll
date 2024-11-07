import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/layout/app-header";
import { AppSidebar } from "@/layout/app-sidebar";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import { Produto } from "@/model/produtos";
import { DataTable } from "@/components/payments/data-table";
import { columns } from "@/components/payments/columns";

export const getStaticProps = (async (context) => {
	const res = await fetch("http://localhost:3000/api/produtos/todosprodutos");
	const res_produtoPorId = await fetch(
		`http://localhost:3000/api/produtos/${1}`,
	);
	const produto: Produto[] = await res.json();
	const produtoPorId: Produto = await res_produtoPorId.json();
	return {
		props: {
			produto,
			produtoPorId,
		},
	};
}) satisfies GetStaticProps<{
	produto: Produto[];
}>;

export default function Produtos({
	produto,
	produtoPorId,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
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
