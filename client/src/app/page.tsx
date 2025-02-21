"use client";
import RiotAccount from "@/components/RiotAccount";
import RiotPuuid from "@/components/RiotPuuid";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <h1>{"Guest"}</h1>
      <Link href="/login">Login</Link>
      <RiotAccount />
      <RiotPuuid />
    </div>
  );
}
