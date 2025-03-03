"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const firstName = searchParams.get("firstName") || ""

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-amber-50">
      <Card className="w-full max-w-md bg-white shadow-md">
        <CardHeader>
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-serif font-medium text-amber-900">Registration Complete</h1>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg text-gray-700 mb-2">
            Thank you,{" "}
            <span className="font-medium">
              {firstName}
            </span>
            !
          </p>
          <p className="text-gray-600">
            Your registration with Sri Lankaramaya Temple has been successfully completed. We look forward to welcoming
            you to our community.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50">
              Register another person
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}

