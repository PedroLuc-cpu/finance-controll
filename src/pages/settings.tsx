"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/layout/app-header";
import { AppSidebar } from "@/layout/app-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Separator } from "@/components/ui/separator";

const FormSchema = z.object({
  avatar_url: z.string().url(),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  email: z.string().email(),
});

export default function Settings() {
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <div>
          <AppHeader />
          <AppSidebar />
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="hidden flex-col md:flex">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <div className="flex flex-col space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Configurações
                </h2>
                <p className="text-gray-400">
                  Gerencie as configurações da sua conta e defina as
                  preferências de e-mail.
                </p>
              </div>
              <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="profile">Perfil</TabsTrigger>
                  <TabsTrigger value="account">Conta</TabsTrigger>
                  <TabsTrigger value="appearance" disabled>
                    Aparência
                  </TabsTrigger>
                  <TabsTrigger value="notifications" disabled>
                    Notificações
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="space-y-4">
                  {/* <p>Perfil</p> */}
                </TabsContent>
                <TabsContent value="profile" className="space-y-4">
                  <div className="flex-1 overflow-y-auto">
                    <div className="hidden flex-col md:flex">
                      <div className="flex-1 py-4">
                        <div className="flex flex-col space-y-2">
                          <p className="text-gray-400">
                            Atualize as configurações da sua conta. Defina seu
                            idioma e fuso horário preferidos.
                          </p>
                        </div>
                      </div>
                      <div>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                          >
                            <FormField
                              control={form.control}
                              name="avatar_url"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-bold tracking-tight">
                                    Avatar
                                  </FormLabel>
                                  <div className="flex items-center gap-8">
                                    <Avatar className="h-16 w-16">
                                      <AvatarImage
                                        src={session?.user.image as string}
                                        alt={session?.user.image as string}
                                      />
                                      <AvatarFallback />
                                    </Avatar>
                                    <ContextMenu>
                                      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                                        Clique aqui
                                      </ContextMenuTrigger>
                                    </ContextMenu>
                                  </div>
                                </FormItem>
                              )}
                            />
                            <Separator />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-bold tracking-tight">
                                    Username
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="seu email" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Este é o nome que será exibido no seu perfil
                                    e nos e-mails.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="dob"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel className="font-bold tracking-tight">
                                    Data de nascimento
                                  </FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value &&
                                              "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "P")
                                          ) : (
                                            <span>Escolha uma data</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormDescription>
                                    Sua data de nascimento é usada para calcular
                                    sua idade.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit" variant={"secondary"}>
                              Atualizar conta
                            </Button>
                          </form>
                        </Form>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
