import RiskAnlysis from '@/components/card/RiskAnlysis'
import RiskScore from '@/components/card/RiskScore'
import TokenInformation from '@/components/card/TokenInformation'
import { getTokenData, tokenData } from '@/lib/token'
import React from 'react'
import { Address } from 'viem'

const page = async ({ params }: { params: Promise<{ address: Address }> }) => {
    let tokenData: tokenData = {
        contractAddress: "0x",
        decimals: 0,
        deployer: "0x",
        image: "",
        name: "",
        owner: "0x",
        risks: [],
        riskScore: 0,
        sourceVerified: false,
        symbol: "",
        totalSupply: BigInt(0)
    }
    let error;
    try {
        const { address } = await params
        const { decimals, deployer, name, owner, risks, symbol, totalSupply, verified } = await getTokenData(address)

        const riskScore = risks.reduce((acc, risk) => acc + risk.score, 0) + 100

        tokenData = {
            image: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`,
            name: name,
            contractAddress: address,
            decimals: Number(decimals),
            deployer: deployer,
            owner: owner,
            riskScore: riskScore,
            sourceVerified: verified,
            symbol: symbol,
            totalSupply: totalSupply,
            risks: risks
        }
    } catch(_error) {
        console.log(_error)
        error = "Token Address Invalid Or Smart Contract Not found"
    }

    return (
        <div className='flex flex-col gap-6 lg:flex-row max-w-7xl'>
            {error ? (
                <div className='w-full h-svh text-2xl font-bold flex justify-center items-center text-center sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>{error}</div>
            ) : (
                <>
                    <div className='flex flex-col gap-6'>
                        <TokenInformation tokenData={tokenData} />
                        <RiskAnlysis tokenData={tokenData} />
                    </div>
                    <RiskScore tokenData={tokenData} />
                </>
            )}
        </div>
    )
}

export default page