import { Roboto } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useReportWebVitals } from "next/web-vitals";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useReportWebVitals((metric) => {
    console.log(metric);
  });
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider session={session} baseUrl="/signIn">
        <TooltipProvider>
          <main className={roboto.className}>
            <Component {...pageProps} />
          </main>
        </TooltipProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
