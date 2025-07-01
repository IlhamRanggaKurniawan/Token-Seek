import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ChartColumnIncreasing, Search, Shield } from 'lucide-react'

const Feature = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='space-y-6 py-12 max-w-7xl'>
                <div className='space-y-4'>
                    <h2 className='text-3xl font-bold text-center md:text-4xl'>Comprehensive Token Analysis</h2>
                    <p className='text-gray-600 text-xl text-center lg:px-28'>Our advanced algorithms analyze smart contracts to identify potential risks and provide you with the insights you need to invest safely.</p>
                </div>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    <Card>
                        <CardHeader>
                            <Shield className='text-blue-600 h-8 w-8' />
                        </CardHeader>
                        <CardTitle className='px-6 text-xl font-semibold'>
                            Smart Contract Risk Analysis
                        </CardTitle>
                        <CardContent>
                            <p className='text-gray-600'>Comprehensive analysis of minting, blacklist, pause functions and other contract risks to keep you safe.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <ChartColumnIncreasing className='text-green-600 h-8 w-8' />
                        </CardHeader>
                        <CardTitle className='px-6 text-xl font-semibold'>
                            Real-time Token Data
                        </CardTitle>
                        <CardContent>
                            <p className='text-gray-600'>Access live token information including supply, ownership, deployment details, and verification status.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Search className='text-purple-600 h-8 w-8' />
                        </CardHeader>
                        <CardTitle className='px-6 text-xl font-semibold'>
                            Advanced Token Search
                        </CardTitle>
                        <CardContent>
                            <p className='text-gray-600'>Search and analyze any token by address, symbol, or name across multiple blockchain networks.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Feature