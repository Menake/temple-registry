import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

// interface SuccessMessageProps {
//   data: {
//     firstName: string
//     lastName: string
//     email: string
//   } | null
// }

export default function SuccessMessage() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-4">
        <div className="flex justify-center mb-2">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">Registration Successful!</CardTitle>
        <CardDescription className="text-center">
            Thank you for registering with Sri Lankaramaya Temple. We look forward to seeing you at our upcoming events</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" variant="outline" onClick={() => window.location.reload()}>
          Register Another Person
        </Button>
      </CardFooter>
    </Card>
  )
}

