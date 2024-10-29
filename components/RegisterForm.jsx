"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router= useRouter();

  const handleSubmit = async(e) => {
    e.preventDefault();
   

    if (!name || !email || !password) {
      setError("Please fill in all your details.");
      return;
    }

    try{
      const UserExist = await fetch("api/userExist", {
         method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email}),

      })     
      
      const {user}= await UserExist.json();
      if (user) {
        setError("User already exist");
        return;
      };

    const res= await fetch("api/register", {
         method: "POST",
         headers:{
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
          name,email,password
         }),
     });
    
    if(res.ok){
      const form = e.target;
      form.reset();
      router.push("/");
    }else{
      console.log("Registration failed"); m
    }
   } catch(error){
      console.log("An Error occurred while registering: ",error)
    }

  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-7 rounded-lg border-t-4 border-b-4 border-r-4 border-l-4 border-blue-800">
        <h1 className="text-2xl text-center font-bold my-5">Register</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="bg-blue-700 text-center ml-28 my-5 place-items-center rounded-full text-xl cursor-pointer mb-3 font-bold px-5 py-3">
            Register
          </button>
        </form>

        {error && (
          <div className="mt-2 py-2 px-2 mr-12 bg-red-600 mb-6 text-white">
            {error}
          </div>
        )}

        <Link href={"/"} className="text-sm">
          Already have an account?
          <span className="underline">Login</span>
        </Link>
      </div>
    </div>
  );
}
