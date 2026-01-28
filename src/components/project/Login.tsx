"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authApiRepository } from "@/domain/apiRepository/authApiRepository"
import { userService } from "@/domain/services/userService"
import { authServices } from "@/domain/services/authService"
import { toast } from "sonner"


export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/"
  const [loginData, setLoginData] = useState({username:"", password:""})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target
    console.log(loginData)
    setLoginData({
      ...loginData,
      [name]:value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await authServices.login(loginData)
      console.log(response)
      localStorage.setItem('token',response.token)
      localStorage.setItem('user',JSON.stringify(response.user))
      router.push(redirect)
    } catch (err:any) {
      for (const e of err.response.data.errors){
        toast.error(e.detail, { position: "top-right" })
      }
      
      console.log(err)
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
                onChange={handleChange}
                name="username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                name="password"
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href={`/register?redirect=${redirect}`} className="text-primary hover:underline">
                Register here
              </Link><br/>
              <Link href="/" className="text-primary">
                Home
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
