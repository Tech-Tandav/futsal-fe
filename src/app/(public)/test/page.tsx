import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const Helloo = () => {
  return (
    <>
    <h1>test</h1>
    <Card className='w-full max-w-sm'>
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
    <h1>test</h1>
    </>
  )
}

export default Helloo