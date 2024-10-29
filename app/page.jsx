import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOpt } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOpt);
 if(session) redirect("/dashboard")


  return (
    <main>
      <LoginForm />
    </main>
  );
}
