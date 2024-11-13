"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";

const formSchema = z.object({
  email: z.string().email({ message: "coloque um email válido" }),
});

export default function Recovery() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    data: z.infer<typeof formSchema>
  ) => {
    try {
      await api.post("/user/reset-account", {
        email: data.email,
      });
      await router.push("/recoverycode");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121214] text-white">
      <Card className="w-full max-w-md bg-[#202024] border-[#202024]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Esqueci minha senha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("email")}
              placeholder="seu email"
              className="text-white placeholder-gray-400"
            />
            <Button className="w-full text-white" disabled={isSubmitting}>
              Recuperar minha senha
              {isSubmitting && <Loader2 className="animate-spin" />}
            </Button>
          </form>
          <div className="mt-6">
            <Link
              href="/signIn"
              className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
