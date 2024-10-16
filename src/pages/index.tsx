import { useSession } from "next-auth/react";
import FinanceDashboard from "./finance-dashboard";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      {session && (
        <>
          <FinanceDashboard />
        </>
      )}
    </main>
  );
}
