import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Mail className="h-10 w-10 text-primary" />
        </div>

        <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Check your email</h1>

        <p className="text-muted-foreground mb-8">
          We've sent you a verification link. Please check your email and click the link to activate your account.
        </p>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/signin">
              Continue to Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full bg-transparent">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Didn't receive the email? <button className="text-primary hover:underline">Resend verification email</button>
        </p>
      </div>
    </div>
  )
}
