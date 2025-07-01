import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Users } from 'lucide-react'
import { Progress } from '../ui/progress'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { tokenData } from '@/lib/token'
import Link from 'next/link'

const getRiskScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    if (score >= 40) return "text-orange-600"
    return "text-red-600"
}

const RiskScore = ({ tokenData }: { tokenData: tokenData }) => {
    return (
        <Card className='h-fit w-full lg:max-w-96 xl:w-96'>
            <CardHeader className='flex gap-2 items-center'>
                <Users size={20} />
                <h2 className='text-lg font-bold'>Risk Assessment</h2>
            </CardHeader>
            <CardContent>
                <div className='text-center'>
                    <div className={`text-4xl font-bold ${getRiskScoreColor(tokenData.riskScore)}`}>
                        {tokenData.riskScore}/100
                    </div>
                    <p className='text-sm text-gray-600 mt-1'>Overall Risk Score</p>
                    <Progress value={tokenData.riskScore} className='mt-4' />
                </div>
                <Separator className='my-6' />
                <div>
                    <p className='font-semibold'>Risk Breakdown</p>
                    <div className='space-y-2 pt-6'>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm text-gray-600'>High Risk Issues</p>
                            <Badge variant="outline" className='rounded-full text-red-600 bg-red-50 border-red-200'>
                                {tokenData.risks.filter(r => r.level === 'High Risk').length}
                            </Badge>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm text-gray-600'>Mediun Risk Issues</p>
                            <Badge variant="outline" className='rounded-full text-yellow-600 bg-yellow-50 border-yellow-200'>
                                {tokenData.risks.filter(r => r.level === 'Medium Risk').length}
                            </Badge>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm text-gray-600'>Low Risk Issues</p>
                            <Badge variant="outline" className='rounded-full text-blue-600 bg-blue-50 border-blue-200'>
                                {tokenData.risks.filter(r => r.level === 'Low Risk').length}
                            </Badge>
                        </div>
                    </div>

                    <Separator className='my-6' />

                    <Button variant="outline" className='w-full rounded-lg p-0'>
                        <Link target='_blank' href={`https://etherscan.io/token/${tokenData.contractAddress}`} className='w-full h-full flex items-center justify-center'>
                            View on Etherscan
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default RiskScore