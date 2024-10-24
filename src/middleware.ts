import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("next-auth.session-token")?.value;

  // Se o usuário estiver autenticado
  if (currentUser) {
    // Permitir acesso a outras rotas além de /produtos ou /orders
    if (
      !request.nextUrl.pathname.startsWith("/produtos") &&
      !request.nextUrl.pathname.startsWith("/orders") &&
      !request.nextUrl.pathname.startsWith("/clients") &&
      !request.nextUrl.pathname.startsWith("/dashboard") &&
      !request.nextUrl.pathname.startsWith("/settings")
    ) {
      return Response.redirect(new URL("/dashboard", request.url)); // Redireciona para orders se não for uma rota permitida
    }
  }

  // Se o usuário não estiver autenticado
  if (!currentUser) {
    // Redireciona para a página de login se tentar acessar qualquer página não permitida
    if (!request.nextUrl.pathname.startsWith("/signIn")) {
      return Response.redirect(new URL("/signIn", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|recovery|create-account).*)",
  ],
};
