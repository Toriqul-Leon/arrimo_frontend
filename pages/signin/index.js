import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

export default function Home() {
  const [show, setShow] = useState("signin");

  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    router.push("/");
  }



  return (
    <>
      {
        show === "signin" ? <SignIn setShow={setShow} /> : <SignUp setShow={setShow} /> 
      }
    </>
  );
}
