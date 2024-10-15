"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Recovery() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121214] text-white">
      <Card className="w-full max-w-md bg-[#202024] border-[#202024]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Esqueci minha senha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-200"
              >
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Pedrolucas_gta2015@hotmail.com"
                className="bg-[#121214] border-[#8257e5] text-white placeholder-gray-400"
              />
            </div>
            <Button className="w-full bg-[#8257e5] hover:bg-[#9466ff] text-white">
              Recuperar minha senha
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
