"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authApiRepository } from "@/domain/apiRepository/authApiRepository"
// import { djangoAPI } from "@/lib/django-api"
import { userService } from "@/domain/services/userService"


const fillDemoAccount = (
  type: "owner" | "customer" | "admin",
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
) => {
  if (type === "owner") {
    setEmail("owner@demo.com")
    setPassword("demo123")
  } else if (type === "admin") {
    setEmail("admin@demo.com")
    setPassword("demo123")
  } else {
    setEmail("customer@demo.com")
    setPassword("demo123")
  }
}

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await authApiRepository.login({username, password})
      localStorage.setItem('token', response?.data.token)
      try {
        const token = localStorage.getItem('token')
        if (token){
          const user = await userService.meUser();
          localStorage.setItem('user', JSON.stringify(user))
        }
      } catch (e) {
        console.error(e);
      }
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          {/* {!process.env.NEXT_PUBLIC_DJANGO_API_URL && (
            <Alert className="mb-4 border-primary/50 bg-primary/5">
              <AlertDescription className="text-sm">
                <p className="font-medium mb-3">Demo Mode - Quick Login:</p>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => fillDemoAccount("customer", setEmail, setPassword)}
                  >
                    Login as Customer
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => fillDemoAccount("owner", setEmail, setPassword)}
                  >
                    Login as Owner
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => fillDemoAccount("admin", setEmail, setPassword)}
                  >
                    Login as Admin
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )} */}

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
