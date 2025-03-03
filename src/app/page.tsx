"use client";

// import { useActionState } from "react";
import Image from "next/image";
import RegisterForm from "@/components/register-form";

const LOGO_SIZE = 60

export default function Home() {

  return (
    <div className="flex flex-col flex-1 h-screen">
      <main className="flex flex-col flex-1 gap-8 sm:items-center sm:justify-center p-4 sm:p-0">
        
        <div className="flex flex-row items-center gap-8">
          <Image src="/logo.png" alt={""} width={LOGO_SIZE} height={LOGO_SIZE} />
          <h1 className="font-bold text-2xl text-center">Sri Lankaramaya</h1>
        </div>
        <RegisterForm />
      </main>
      <footer className="text-sm text-center h-12 flex items-center justify-center">
        <div>
          Srilankaramaya © {new Date().getFullYear()}. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
