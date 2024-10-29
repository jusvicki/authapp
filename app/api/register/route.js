import { connectMongoDB } from "@/lib/Mongodb"
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req) {
 try{
const{name,email,password} = await req.json();
const hashedPassword= await bcrypt.hash(password, 10);
await connectMongoDB();
await User.create({name,email, password: hashedPassword});
return NextResponse.json({message:"You have been Registered"}, {status:201})
 }catch(error){
    return NextResponse.json({message:"Error occurred"}, {status:500})
 }
}
