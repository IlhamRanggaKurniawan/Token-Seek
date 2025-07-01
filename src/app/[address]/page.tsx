import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertTriangle, BadgeCheck, CheckCircle, Code, Copy, Shield, Users, XCircle } from 'lucide-react'
import React from 'react'

const tokenData = {
    image: "/placeholder.svg?height=80&width=80",
    name: "Example Token",
    symbol: "EXMPL",
    decimal: 18,
    totalSupply: "1,000,000,000",
    deployer: "0x742d35Cc6634C0532925a3b8D4C9db96590e4CAF",
    owner: "0x8ba1f109551bD432803012645Hac136c22C85B",
    sourceVerified: true,
    riskScore: 75,
    contractAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
}

const smartContractRisks = [
    {
        risk: "Minting Function",
        status: "High Risk",
        description: "Contract can mint new tokens",
        severity: "high",
    },
    {
        risk: "Blacklist Function",
        status: "Medium Risk",
        description: "Contract can blacklist addresses",
        severity: "medium",
    },
    {
        risk: "Pause Function",
        status: "Low Risk",
        description: "Contract can be paused by owner",
        severity: "low",
    },
    {
        risk: "Ownership Renounced",
        status: "Safe",
        description: "Contract ownership has been renounced",
        severity: "safe",
    },
    {
        risk: "Proxy Contract",
        status: "Medium Risk",
        description: "Contract is upgradeable via proxy",
        severity: "medium",
    },
    {
        risk: "Transfer Tax",
        status: "High Risk",
        description: "Contract charges tax on transfers",
        severity: "high",
    },
]

const getRiskColor = (severity: string) => {
    switch (severity) {
        case "high":
            return "text-red-600 bg-red-50 border-red-200"
        case "medium":
            return "text-yellow-600 bg-yellow-50 border-yellow-200"
        case "low":
            return "text-blue-600 bg-blue-50 border-blue-200"
        case "safe":
            return "text-green-600 bg-green-50 border-green-200"
        default:
            return "text-gray-600 bg-gray-50 border-gray-200"
    }
}

const getRiskIcon = (severity: string) => {
    switch (severity) {
        case "high":
            return <XCircle className="h-4 w-4" />
        case "medium":
            return <AlertTriangle className="h-4 w-4" />
        case "low":
            return <AlertTriangle className="h-4 w-4" />
        case "safe":
            return <CheckCircle className="h-4 w-4" />
        default:
            return <AlertTriangle className="h-4 w-4" />
    }
}

const getRiskScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    if (score >= 40) return "text-orange-600"
    return "text-red-600"
}

const page = () => {
    return (
        <div className='flex flex-col gap-6 lg:flex-row max-w-7xl'>
            <div className='flex flex-col gap-6'>
                <Card className='xl:max-w-[50rem] xl:w-[50rem]'>
                    <CardHeader className='flex gap-4 items-center'>
                        <Code size={20} />
                        <h2 className='text-lg font-bold'>Token Information</h2>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-4'>
                        <div className='flex items-center gap-2'>
                            <div className='w-12 h-12 rounded-full bg-gray-400 aspect-square' />
                            <div className='w-full'>
                                <h3 className='text-lg font-semibold line-clamp-2 w-full'>Launch Coin on believe</h3>
                                <p className=''>LNCH</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                                <div>
                                    <div className='flex items-center gap-2'>
                                        <h4>Contract Address</h4>
                                        <Copy className='w-4 h-4' />
                                    </div>
                                    <p className='w-full truncate'>0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984</p>
                                </div>
                                <div>
                                    <h4>Decimals</h4>
                                    <p>18</p>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                                <div>
                                    <h4>Total Supply</h4>
                                    <p>1,000,000,000 EXMPL</p>
                                </div>
                                <div>
                                    <h4>Source Verified</h4>
                                    <div className='flex gap-1 items-center text-green-500'>
                                        <BadgeCheck />
                                        <p>Verified</p>
                                    </div>
                                </div>
                            </div>
                            <Separator className='my-3' />
                            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                                <div>
                                    <div className='flex items-center gap-2'>
                                        <h4>Deployer</h4>
                                        <Copy className='w-4 h-4' />
                                    </div>
                                    <p className='w-full truncate'>0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984</p>
                                </div>
                                <div>
                                    <div className='flex items-center gap-2'>
                                        <h4>Owner</h4>
                                        <Copy className='w-4 h-4' />
                                    </div>
                                    <p className='w-full truncate'>0x8ba1f109551bD432803012645Hac136c22C85B</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className='flex items-center gap-2'>
                            <Shield size={20} />
                            <h2 className='text-xl font-bold'>Smart Contract Risk Analysis</h2>
                        </div>
                        <CardDescription>Detailed analysis of potential risks in the smart contract</CardDescription>                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='text-slate-600 font-semibold'>Risk Factor</TableHead>
                                    <TableHead className='text-slate-600 font-semibold'>Status</TableHead>
                                    <TableHead className='text-slate-600 font-semibold'>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {smartContractRisks.map((risk, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{risk.risk}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`${getRiskColor(risk.severity)} flex items-center w-fit rounded-full`}
                                            >
                                                {getRiskIcon(risk.severity)}
                                                <span>{risk.status}</span>
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">{risk.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <Card className='h-fit lg:max-w-96'>
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
                                <Badge variant="outline" className='rounded-full text-red-600 bg-red-50 border-red-200'>2</Badge>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='text-sm text-gray-600'>Mediun Risk Issues</p>
                                <Badge variant="outline" className='rounded-full text-yellow-600 bg-yellow-50 border-yellow-200'>2</Badge>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='text-sm text-gray-600'>Low Risk Issues</p>
                                <Badge variant="outline" className='rounded-full text-blue-600 bg-blue-50 border-blue-200'>2</Badge>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='text-sm text-gray-600'>Safe Factors</p>
                                <Badge variant="outline" className='rounded-full text-green-600 bg-green-50 border-green-200'>2</Badge>
                            </div>
                        </div>

                        <Separator className='my-6' />

                        <div className='space-y-3'>
                            <p className='font-semibold'>Recommendation</p>
                            <p className='text-gray-600 text-sm'>This token has several high-risk factors including minting capabilities and transfer taxes. Exercise extreme caution when interacting with this contract.</p>
                        </div>

                        <Separator className='my-6' />

                        <Button variant="outline" className='w-full rounded-lg'>
                            View on Etherscan
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default page