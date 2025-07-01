import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
import { AlertTriangle, Shield, XCircle } from 'lucide-react'
import { Badge } from '../ui/badge'
import { tokenData } from '@/lib/token'

const getRiskColor = (severity: string) => {
    switch (severity) {
        case "High Risk":
            return "text-red-600 bg-red-50 border-red-200"
        case "Medium Risk":
            return "text-yellow-600 bg-yellow-50 border-yellow-200"
        case "Low Risk":
            return "text-blue-600 bg-blue-50 border-blue-200"
        default:
            return "text-gray-600 bg-gray-50 border-gray-200"
    }
}

const getRiskIcon = (level: string) => {
    switch (level) {
        case "High Risk":
            return <XCircle className="h-4 w-4" />
        case "Medium Risk":
            return <AlertTriangle className="h-4 w-4" />
        case "Low Risk":
            return <AlertTriangle className="h-4 w-4" />
        default:
            return <AlertTriangle className="h-4 w-4" />
    }
}

const RiskAnlysis = ({tokenData} : {tokenData: tokenData}) => {
    return (
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
                        {tokenData.risks && tokenData.risks.map((risk, index) => (
                            <TableRow key={index}>
                                <TableCell>{risk.factor}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={`${getRiskColor(risk.level)} flex items-center w-fit rounded-full`}
                                    >
                                        {getRiskIcon(risk.level)}
                                        <span>{risk.level}</span>
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-gray-600">{risk.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default RiskAnlysis