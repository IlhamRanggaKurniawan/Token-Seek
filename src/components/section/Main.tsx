"use client"

import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const Main = () => {
    const [input, setInput] = useState("")
    const router = useRouter()

    const handleClick = () => {
        router.push(`/${input}`)
    }

    return (
        <div className='w-full py-12 space-y-6'>
            <h2 className='text-center text-4xl font-bold md:text-6xl'>
                Analyze Crypto Tokens <br />
                <span className='text-blue-600'>Before You Invest</span>
            </h2>
            <p className='text-gray-600 text-xl text-center lg:px-28'>Protect yourself from rug pulls and scams with our comprehensive smart contract risk analysis. Get detailed insights on token safety, ownership, and potential risks in seconds.</p>
            <div className='lg:flex lg:items-center lg:justify-center'>
                <div className='w-full space-y-4 sm:flex sm:space-x-6 lg:max-w-2xl'>
                    <div className='relative w-full'>
                        <Search className='absolute text-gray-400 h-full aspect-square mx-2' />
                        <Input className='rounded-xl bg-white pl-10 h-12' placeholder='Enter Token Address' onChange={(e) => setInput(e.target.value)} value={input} />
                    </div>
                    <Button className='rounded-xl p-6 w-full cursor-pointer sm:w-fit' onClick={handleClick}>Analyze Token</Button>
                </div>
            </div>
        </div>
    )
}

export default Main