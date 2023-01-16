import { Button } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  if (status === "authenticated") {
    return (
      <div>
        <Button onClick={() => signOut()}>Sign out</Button>
        <h1>Home</h1>
        
      </div>
    );
  }
}
