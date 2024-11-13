"use client";
import { useState } from "react";
import { Chrome, Eye, EyeOff, Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaSignIn = z.object({
  email: z.string().email({ message: "use um email válido" }),
  password: z
    .string()
    .min(10, { message: "sua senha deve ter no máximo 10 caracteres" }),
});

type TSignIn = z.infer<typeof schemaSignIn>;

export default function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<TSignIn>({
    resolver: zodResolver(schemaSignIn),
    defaultValues: {
      email: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handlerSignUp = () => {
    router.push("create-account");
  };

  console.log(session);

  const onSubmit: SubmitHandler<TSignIn> = async (data) => {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.log(error);
    }
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
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-200"
            >
              E-mail
            </label>
            <Input
              {...register("email")}
              disabled={isSubmitting}
              id="email"
              type="email"
              placeholder="Seu email"
              className="w-full bg-[#202024] border-[#202024] text-white placeholder-gray-400 pr-10"
            />
          </div>
          <div className="relative">
            <Input
              {...register("password")}
              disabled={isSubmitting}
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

          <a
            href="recovery"
            className="block text-sm text-gray-500 hover:text-gray-400 hover:underline"
          >
            Esqueci minha senha
          </a>
          <Button className="w-full text-white" disabled={isSubmitting}>
            Entrar
            {isSubmitting && <Loader2 className="animate-spin" />}
          </Button>
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
