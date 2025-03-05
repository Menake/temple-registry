import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-sm border border-gray-100",
            headerTitle: "text-gray-900 font-serif",
            headerSubtitle: "text-gray-600",
            formButtonPrimary: "bg-amber-600 hover:bg-amber-700",
            logoImage: "h-20 aspect-square"
          },
        }}
        signInUrl="/sign-in"
      />
    </div>
  )
}

