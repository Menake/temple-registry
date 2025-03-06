import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Api } from "@/lib/api";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const url = Api.auth.login.google.$url();

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-balance text-muted-foreground mt-4">
                    Sign in to your Sri Lankaramaya management account
                    </p>
                </div>
                <Button asChild variant="outline">
                        <Link href={url.toString()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                                />
                            </svg>
                            <span >Continue with Google</span>
                        </Link>
                    </Button>
                </div>
            </form>
            <div className="relative hidden bg-muted md:block">
                <div className="flex h-full flex-1 items-center justify-center">
                    <Image
                    src="/logo.png"
                    alt="Image"
                    width={100}
                    height={100}
                    className="dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
            </CardContent>
        </Card>
        </div>
    )
}
