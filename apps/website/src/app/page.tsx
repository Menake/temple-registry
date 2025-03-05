import RegistrationForm from "@/components/registration-form"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col items-center mb-8 gap-4">
          <Image src="/logo.png" alt="Sri Lankaramaya logo" height={100} width={100} />
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-2">Sri Lankaramaya</h1>
        </div>
        <RegistrationForm />
      </div>
    </main>
  )
}

