"use client"

import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { BadgeCheck, BadgeXIcon, Code, Copy } from 'lucide-react'
import { Separator } from '../ui/separator'
import { tokenData } from '@/lib/token'
import Image from 'next/image'
import { formatTokenAmount } from '@/lib/utils'
import { Address } from 'viem'

const TokenInformation = ({tokenData} : {tokenData: tokenData}) => {
    const copyAddress = async(address : Address | undefined | null) => {
        await navigator.clipboard.writeText(address || "");
    }

    return (
        <Card className='xl:max-w-[50rem] xl:w-[50rem]'>
            <CardHeader className='flex gap-4 items-center'>
                <Code size={20} />
                <h2 className='text-lg font-bold'>Token Information</h2>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                    <div className='w-12 h-12 rounded-full bg-gray-400 aspect-square'>
                        <Image src={tokenData.image} alt={""} width={500} height={500}/>
                    </div>
                    <div className='w-full'>
                        <h3 className='text-lg font-semibold line-clamp-2 w-full'>{tokenData.name}</h3>
                        <p className=''>{tokenData.symbol}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <h4>Contract Address</h4>
                                <Copy className='w-4 h-4 cursor-pointer' onClick={() => copyAddress(tokenData.contractAddress)}/>
                            </div>
                            <p className='w-full truncate'>{tokenData.contractAddress}</p>
                        </div>
                        <div>
                            <h4>Decimals</h4>
                            <p>{tokenData.decimals}</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                        <div>
                            <h4>Total Supply</h4>
                            <p>{formatTokenAmount(tokenData.totalSupply, tokenData.decimals)} {tokenData.symbol}</p>
                        </div>
                        <div>
                            <h4>Source Verified</h4>
                            <div className={`flex gap-1 items-center ${tokenData.sourceVerified ? "text-green-500" : "text-red-500"}`}>
                                {tokenData.sourceVerified ? <BadgeCheck/> : <BadgeXIcon />}
                                <p>{tokenData.sourceVerified ? "Verified" : "Unverified"}</p>
                            </div>
                        </div>
                    </div>
                    <Separator className='my-3' />
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <h4>Deployer</h4>
                                <Copy className='w-4 h-4 cursor-pointer' onClick={() => copyAddress(tokenData.deployer)}/>
                            </div>
                            <p className='w-full truncate'>{tokenData.deployer}</p>
                        </div>
                        <div>
                            <div className='flex items-center gap-2'>
                                <h4>Owner</h4>
                                <Copy className='w-4 h-4 cursor-pointer' onClick={() => copyAddress(tokenData.owner)}/>
                            </div>
                            <p className='w-full truncate'>{tokenData.owner ? tokenData.owner : "Ownership Renounced"}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default TokenInformation