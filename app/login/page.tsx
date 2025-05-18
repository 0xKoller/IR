import Link from "next/link"
import { Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="mb-8 flex items-center gap-2">
        <Leaf className="h-8 w-8 text-emerald-500" />
        <span className="text-3xl font-bold tracking-tight">ZenWallet</span>
      </div>
      <Card className="w-full max-w-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-4xl font-black">LOG IN</CardTitle>
          <CardDescription className="text-xl">Enter your credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg font-bold">
              EMAIL
            </Label>
            <Input id="email" type="email" placeholder="m@example.com" className="h-14 text-lg border-2 border-black" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-lg font-bold">
                PASSWORD
              </Label>
              <Link href="/forgot-password" className="text-base font-medium underline-offset-4 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" className="h-14 text-lg border-2 border-black" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-6">
          <Button className="w-full h-14 text-xl bg-black text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all">
            LOG IN
          </Button>
          <div className="text-center text-lg">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-emerald-500 font-bold underline-offset-4 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
