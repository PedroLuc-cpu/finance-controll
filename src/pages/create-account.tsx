"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeIcon, EyeOffIcon, MoveLeft } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";

const createUserSchema = z.object({
  fullName: z.string().max(5, { message: "Nome deve no minimo 5 caracteres" }),
  email: z.string().email(),
  passaword: z.string(),
  confirmedPassaword: z.string(),
  isNotification: z.string(),
});

export type UserSchema = z.infer<typeof createUserSchema>;

export default function AreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit } = useForm<UserSchema>();

  const onSubmit: SubmitHandler<UserSchema> = async (data) => {
    try {
      const response = await fetch("/api/user/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          password: data.passaword,
          confirmedPassword: data.confirmedPassaword,
          isNotification: data.isNotification,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Usuário criado com sucesso!");
      } else {
        const errorData = await response.json();
        alert(`Erro ao criar usuário: ${errorData.message}`);
      }
    } catch (error) {
      alert("Erro ao se comunicar com o servidor. Tente novamente.");
      console.error("Erro ao se comunicar com a API:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="w-full max-w-md p-6 bg-zinc-800 rounded-lg shadow-md">
        <h2 className="flex gap-2 items-center text-2xl font-semibold text-white mb-6">
          <Link
            href="/signIn"
            className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-[#22C55E] group py-1 px-3 rounded-md"
          >
            <MoveLeft className="group-hover:text-[#22C55E]" />
          </Link>
          Cadastre-se gratuitamente
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className="text-sm font-medium text-zinc-400"
            >
              Nome completo
            </Label>
            <Input
              {...register("fullName", { required: true })}
              id="fullName"
              placeholder="Seu nome completo"
              className="w-full bg-[#202024] border-[#202024] text-white placeholder-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-zinc-400"
            >
              E-mail
            </Label>
            <Input
              {...register("email", { required: true })}
              id="email"
              type="email"
              placeholder="Seu e-mail"
              className="w-full bg-[#202024] border-[#202024] text-white placeholder-gray-400"
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
                {...register("passaword", { required: true })}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Deve ter no mínimo 7 caracteres"
                className="w-full bg-[#202024] border-[#202024] text-white placeholder-gray-400"
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
                {...register("confirmedPassaword", { required: true })}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Deve ter no mínimo 7 caracteres"
                className="w-full bg-[#202024] border-[#202024] text-white placeholder-gray-400"
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
            <Checkbox
              id="recaptcha"
              {...register("isNotification", { required: true })}
            />
            <label
              htmlFor="recaptcha"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-400"
            >
              receber notificação via e-mail.
            </label>
          </div>
          <p className="text-xs text-zinc-400">
            Ao se cadastrar, você aceita nossos{" "}
            <a href="#" className="text-[#22C55E] hover:underline">
              termos de uso
            </a>{" "}
            e a nossa{" "}
            <a href="#" className="text-[#22C55E] hover:underline">
              política de privacidade
            </a>
            .
          </p>
          <Button className="w-full text-white">
            Cadastrar-se gratuitamente
          </Button>
        </form>
      </div>
    </div>
  );
}
