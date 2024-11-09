"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function RecoveryCode() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121214] text-white">
      <Card className="w-full max-w-md bg-[#202024] border-[#202024]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Código de recuperação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-4 flex justify-center">
              <InputOTP maxLength={6} className="">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button className="w-full text-white">Enviar Código</Button>
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
