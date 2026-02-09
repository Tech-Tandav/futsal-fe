"use client" 

import { usePathname } from 'next/navigation'
import React from 'react'

const NotFound = () => {
    const pathName = usePathname()
    console.log(pathName)
    console.log(typeof(pathName))
    return (
        <div>NotFound</div>
    )
}

export default NotFound