"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
const {data: session}= useSession();

  return (
    <div className="grid h-screen place-items-center ">
        <div className="shadow-lg flex flex-col py-8 my-5 px-8  gap-2 ">
            <div>Name: <span className="font-bold">{session?.user?.name}</span></div>
            <div>Email: <span className="font-bold">{session?.user?.email}</span></div>
            <button onClick={() => signOut()} className="text-white bg-red-600 py-2 px-5 mt-4 font-bold">Log Out</button>
        </div>
    </div>
  )
}
