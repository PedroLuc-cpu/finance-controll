"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/lib/axios";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "coloque um email válido" }),
});

export default function Recovery() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    api
      .post("/user/reset-account", value)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121214] text-white">
      <Card className="w-full max-w-md bg-[#202024] border-[#202024]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Esqueci minha senha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="seu email"
                        className="text-white placeholder-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full text-white" disabled={loading}>
                Recuperar minha senha
                {loading && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
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
