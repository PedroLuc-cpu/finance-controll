import { z } from "zod";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormLabel } from "./ui/form";

const schemaMarca = z.object({
	id: z.string(),
	marca: z.string().min(4, { message: "Deve ter no minimo 4 caracteres" }),
});

export function CadastrarMarca() {
	const form = useForm<z.infer<typeof schemaMarca>>({
		resolver: zodResolver(schemaMarca),
	});

	function handleCreateMark(data: z.infer<typeof schemaMarca>) {
		console.log(data);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<p className="cursor-pointer underline text-sm">marca</p>
			</DialogTrigger>
			{/* <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateMark)}> */}
			<DialogContent className="dark:bg-zinc-900">
				<DialogHeader>
					<DialogTitle>Nova Marca</DialogTitle>
					<DialogDescription>
						Caso não tenha a marca desejada, cadastre aqui
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<FormField
							control={form.control}
							name="marca"
							render={({ field }) => (
								<FormLabel className="text-right">Marca</FormLabel>
							)}
						/>
						<FormControl>
							<Input id="marca" className="col-span-3" />
						</FormControl>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Salvar alterações</Button>
				</DialogFooter>
			</DialogContent>
			{/* </form>
      </Form> */}
		</Dialog>
	);
}
