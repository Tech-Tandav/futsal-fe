"use client" 

import { usePathname } from 'next/navigation'
import React from 'react'

const NotFound = () => {
    const pathName = usePathname()
    return (
        <div></div>
    )
}

export default NotFound