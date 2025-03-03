export const runtime = "edge"

import RegistrationForm from "@/components/registration-form"
import Image from "next/image"

const LOGO_SIZE = 100;

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-amber-50">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Image className="mx-auto mb-8" alt="Sri Lankaramaya logo" src="/logo.png" height={LOGO_SIZE} width={LOGO_SIZE} />
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-amber-900 mb-2">Sri Lankaramaya</h1>
        </div>
        <RegistrationForm />
      </div>
    </main>
  )
}

