"use client"

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
     const [email,setEmail] = useState("");
     const [password,setPassword]= useState("");
     const [error, setError]= useState("");

      const router= useRouter();

     const handleSubmit = async (e) => {
            e.preventDefault();

       try {
        const res= await signIn("credentials",{
        email,
        password,
        redirect:false,
        })

        if(res.error){
          setError("Invalid details");
          return;
        }

       router.replace("dashboard");

       } catch (error) {
        console.log(error)
       }     
     }

return (
    <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-7 rounded-lg border-t-4 border-b-4 border-r-4 border-l-4 border-blue-800">
            <h1 className="text-2xl text-center font-bold my-5">Log in details</h1>

             <form onSubmit={handleSubmit}>
              <input onChange={(e)=>setEmail(e.target.value)} type="text"  placeholder="Email"/>
              <input  onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
              <button className="bg-blue-700 text-center ml-28 my-5 place-items-center rounded-full text-xl cursor-pointer mb-3 font-bold px-8 py-3">Log in</button>
             </form>

            {error && (
              <div className="mt-2 py-2 px-2 mr-12 bg-red-600 mb-6 text-white">
             {error}
          </div>
            )}
             <Link href={"/register"} className="text-sm">
             Don&apos;t have an account?<span className="underline">
             Register now
             </span>
             </Link>
        </div>
    </div>
  )
}
