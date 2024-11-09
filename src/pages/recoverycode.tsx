import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
// import Image from "next/image";
import Link from "next/link";

export default function Recoverycode() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-start px-4">
          {/* <Image
            src="/placeholder.svg"
            alt="Stripe"
            className="h-8 w-auto"
            width={82}
            height={32}
          /> */}
        </div>
        <Card className="border-none shadow-lg">
          <CardHeader>
            <h1 className="text-xl dark:text-white font-semibold text-slate-900">
              Faça redefinição com seu código
            </h1>
            <p className="text-sm dark:text-zinc-500 text-slate-600">
              Para continuar, insira o código de verificação de 6 dígitos gerado
              pelo aplicativo autenticador.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center gap-2">
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className="w-12 h-12 text-center text-lg font-medium"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-12 h-12 text-center text-lg font-medium"
                    />
                    <InputOTPSlot
                      index={2}
                      className="w-12 h-12 text-center text-lg font-medium"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={3}
                      className="w-12 h-12 text-center text-lg font-medium"
                    />
                    <InputOTPSlot
                      index={4}
                      className="w-12 h-12 text-center text-lg font-medium"
                    />
                    <InputOTPSlot
                      index={5}
                      className="w-12 h-12 text-center text-lg font-medium"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <Button className="w-full text-white">Continuar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
