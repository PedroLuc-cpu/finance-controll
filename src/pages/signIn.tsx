"use client";

import { useState } from "react";
import { Chrome, Eye, EyeOff, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { redirect, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handlerSignUp = () => {
    router.push("create-account");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121214] text-white">
      <div className="w-full max-w-md p-8 bg-zinc-800 rounded-md">
        <div className="flex justify-center mb-8">
          <h1>{session?.user?.email}</h1>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Acesse sua conta
        </h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Seu e-mail"
              className="w-full bg-[#202024] border-[#202024] text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Senha
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                className="w-full bg-[#202024] border-[#202024] text-white placeholder-gray-400 pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <a
            href="recovery"
            className="block text-sm text-gray-500 hover:text-gray-400 hover:underline"
          >
            Esqueci minha senha
          </a>
          <Button className="w-full text-white">Entrar</Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400 mb-2">Ou se preferir</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                signIn("github");
                if (session) {
                  router.push("finance-dashboard");
                } else {
                  return;
                }
              }}
              className="w-full bg-[#202024] text-white hover:text-white border-[#202024] hover:bg-[#29292e]"
            >
              <Github className="mr-2 h-4 w-4" />
              Entre com github
            </Button>
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                signIn("google");
              }}
              className="w-full bg-[#202024] text-white hover:text-white border-[#202024] hover:bg-[#29292e]"
            >
              <Chrome className="mr-2 h-4 w-4" />
              Entre com Google
            </Button>
          </div>
          <Button
            onClick={handlerSignUp}
            className="w-full bg-[#202024] text-white hover:text-white border-[#202024] hover:bg-[#29292e] mt-2"
          >
            Cadastra-se
          </Button>
        </div>
      </div>
    </div>
  );
}
