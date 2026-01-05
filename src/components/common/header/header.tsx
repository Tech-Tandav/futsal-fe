import Link from 'next/link'
import { Button } from "@/src/components/ui/button"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Building2, LayoutDashboard, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
// import { cookies } from 'next-headers'

const Header = () => {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(storedUser)
    }
    }, [])

    const isAuthenticated = !!user
    // cookies.delte('token')
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-primary-foreground">F</span>
          </div>
          <span className="text-xl font-bold text-foreground">Futsal Booking</span>
        </Link>

        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link href="/">
                <Button variant="ghost">Browse Courts</Button>
              </Link>

              {user?.user_type === "customer" && (
                <Link href="/my-bookings">
                  <Button variant="ghost">My Bookings</Button>
                </Link>
              )}

              {user?.user_type === "owner" && (
                <Link href="/owner/dashboard">
                  <Button variant="ghost">
                    <Building2 className="mr-2 h-4 w-4" />
                    My Dashboard
                  </Button>
                </Link>
              )}

              {user?.user_type === "admin" && (
                <Link href="/admin/dashboard">
                  <Button variant="ghost">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Button>
                </Link>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{user?.username}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user?.user_type}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header