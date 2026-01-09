"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, LayoutDashboard, Building2 } from "lucide-react"
import { IUser } from "@/domain/interfaces/userInterface"
import { userService } from "@/domain/services/userService"


export function Header() {
  const router = useRouter()
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const userStr = localStorage.getItem("user")
      if (userStr){
        setUser(JSON.parse(userStr))
      }

    };
    fetchUser();
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/login")
  }

  const isAuthenticated = !!user

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">FutsalHub</span>
        </Link>

        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link href="/">
                <Button variant="ghost" className="text-sm font-medium">
                  Discover
                </Button>
              </Link>

              {user?.isStaff === false && (
                <Link href="/my-bookings">
                  <Button variant="ghost" className="text-sm font-medium">
                    My Bookings
                  </Button>
                </Link>
              )}

              {user?.isStaff === true && (
                <Link href="/owner/dashboard">
                  <Button variant="ghost" className="text-sm font-medium">
                    <Building2 className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              )}

              {/* {user?.isStaff === "admin" && (
                <Link href="/admin/dashboard">
                  <Button variant="ghost" className="text-sm font-medium">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              )} */}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-sm font-medium">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="text-sm font-medium">Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
