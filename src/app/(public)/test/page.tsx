import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const Helloo = () => {
  return (
    <>
    <Card className=' '>
        <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
            Enter your email below to login to your account
            </CardDescription>
            <CardAction>
            <Button variant="link">Sign Up</Button>
            </CardAction>
        </CardHeader>

    </Card>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full bg-transparent">
          <User className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
       <DropdownMenuContent align="center" className="border rounded-md shadow-md">
          <DropdownMenuLabel>Hasdfasfsafasadfasfasfasdfsadfafsfsfsafsfasfsfasfasasdfsfasfasello</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>hello</DropdownMenuItem>
          
        {/* <DropdownMenuLabel>Hello</DropdownMenuLabel>
        <DropdownMenuLabel>Hola</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>"hello"}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem> */}
      </DropdownMenuContent>  
    </DropdownMenu>

    </>
  )
}

export default Helloo