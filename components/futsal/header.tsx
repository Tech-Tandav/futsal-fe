import Link from 'next/link'
import { Button } from "@/components/ui/button"

const Header = () => {

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
        <div className='container mx-auto flex h-16 px-4 justify-between items-center'>
            <Link href="/" className='flex items-center gap-2'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary'>
                    <span className='text-xl font-bold text-primary-foreground'>F</span>
                </div>
                <span className='text-xl font-bold text-foreground'>Futsal Booking</span>
            </Link>
        
            <nav className="flex items-center gap-4">
                <Link href="/login">
                    <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                    <Button>Register</Button>
                </Link>
            </nav>
        </div>
    </header>
  )
}

export default Header