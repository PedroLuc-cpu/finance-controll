import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session)
    [
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>,
    ];
  return (
    <main>
      {session && (
        <>
          <h1 className="text-white">{session?.user.email}</h1>
          <br />
          <Button onClick={() => signOut()}>Sair</Button>
        </>
      )}
    </main>
  );
}
