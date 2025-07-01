"use client"

import { Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Header = () => {
    const [input, setInput] = useState("")
    const router = useRouter()

    const handleClick = () => {
        setInput("")
        router.push(input)
    }
    return (
        <div className='w-full h-16 shadow-lg flex justify-between items-center px-4 md:px-12 lg:flex lg:items-center lg:justify-center'>
            <div className='max-w-7xl w-full flex justify-between items-center'>
                <Link href="/" className='flex items-center gap-2 '>
                    <TrendingUp color='blue' size={30} />
                    <h1 className='text-2xl font-bold'>TokenSeek</h1>
                </Link>
                <div className='hidden md:flex md:gap-4 '>
                    <Input className='rounded-xl' placeholder='Enter Token Address' onChange={(e) => setInput(e.target.value)} value={input} />
                    <Button className='rounded-xl cursor-pointer' onClick={handleClick}>
                        <Search />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header