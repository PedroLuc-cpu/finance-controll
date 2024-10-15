"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function AreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full max-w-md p-6 bg-zinc-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Cadastre-se gratuitamente
      </h2>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="fullName"
            className="text-sm font-medium text-zinc-400"
          >
            Nome completo
          </Label>
          <Input
            id="fullName"
            placeholder="Seu nome completo"
            className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-zinc-400">
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Seu e-mail"
            className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-zinc-400"
          >
            Senha
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Deve ter no mínimo 7 caracteres"
              className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-zinc-400"
          >
            Confirme sua senha
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Deve ter no mínimo 7 caracteres"
              className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400"
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="recaptcha" />
          <label
            htmlFor="recaptcha"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-400"
          >
            Não sou um robô
          </label>
        </div>
        <p className="text-xs text-zinc-400">
          Ao se cadastrar, você aceita nossos{" "}
          <a href="#" className="text-purple-500 hover:underline">
            termos de uso
          </a>{" "}
          e a nossa{" "}
          <a href="#" className="text-purple-500 hover:underline">
            política de privacidade
          </a>
          .
        </p>
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          Cadastrar-se gratuitamente
        </Button>
      </form>
    </div>
  );
}
