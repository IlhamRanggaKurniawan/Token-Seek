import { Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='w-full bg-blue-950 h-16 flex justify-between items-center text-white px-4 md:px-12'>
            <p>© 2024 TokenSeek. All rights reserved.</p>
            <Link href="https://github.com/IlhamRanggaKurniawan" target='_blank'>
                <Github />
            </Link>
        </div>
    )
}

export default Footer