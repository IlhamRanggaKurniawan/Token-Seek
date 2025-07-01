import { Abi, Address, isAddress } from "viem"
import { client } from "./client"
import { ERC20ABI } from "./abi"
import axios from "axios"

type risk = {
    factor: string,
    level: string,
    score: number,
    description: string
}

export type tokenData = {
    image: string,
    name: string,
    symbol: string,
    decimals: number,
    totalSupply: bigint,
    deployer: Address,
    owner: Address | undefined,
    sourceVerified: boolean,
    riskScore: number,
    risks: risk[],
    contractAddress: Address
}

const isERC20ABI = (abi: Abi) => {
    const requiredFunctions = ["name", "symbol", "decimals", "totalSupply", "balanceOf", "transfer", "transferFrom", "approve", "allowance"]

    const fnNames = abi.filter(item => item.type === "function").map(fn => fn.name.toLocaleLowerCase())

    return requiredFunctions.every(fn => fnNames.includes(fn.toLowerCase()));
}

const getDataFromContract = async (tokenAddress: Address, abi: Abi) => {
    let owner;

    const name = await client.readContract({
        address: tokenAddress,
        abi: abi,
        functionName: "name"
    }) as string

    const symbol = await client.readContract({
        address: tokenAddress,
        abi: abi,
        functionName: "symbol"
    }) as string

    const decimals = await client.readContract({
        address: tokenAddress,
        abi: abi,
        functionName: "decimals"
    }) as bigint

    const totalSupply = await client.readContract({
        address: tokenAddress,
        abi: abi,
        functionName: "totalSupply"
    }) as bigint

    const hasOwner = abi.some((item) => item.type === 'function' && item.name === 'owner')
    if (hasOwner) {
        owner = await client.readContract({
            address: tokenAddress,
            abi: abi,
            functionName: "owner"
        }) as Address
    }

    return { name, totalSupply, symbol, decimals, owner }
}

const analysisContract = (verified: boolean, abi: Abi) => {
    const risks : risk[] = [];

    const fnNames = abi.filter(item => item.type === "function").map(fn => fn.name.toLocaleLowerCase())

    if (fnNames.includes("mint")) {
        risks.push({ factor: "Minting Function", level: "High Risk", description: "Contract can mint new tokens", score: -20 })
    }

    if (fnNames.includes("pause")) {
        risks.push({ factor: "Pause Function", level: "Low Risk", description: "Contract can be paused by owner", score: -5 })
    }

    const blacklist = fnNames.find(name => name.includes("blacklist"))
    if (blacklist) {
        risks.push({ factor: "Blacklist Function", level: "Medium Risk", description: "Contract can blacklist addresses", score: -15 })
    }

    if (!verified) {
        risks.push({ factor: "Unverified Token", level: "High Risk", description: "Contract is not verified by etherscan", score: -60 })
    }

    return risks
}

export const getTokenData = async (tokenAddress: Address) => {
    let verified = false;
    let abi: Abi;

    if (!isAddress(tokenAddress)) {
        throw new Error("Invalid Ethereum address.")
    }

    const [abiRes, creatorRes] = await Promise.all([
        axios.get(`https://api.etherscan.io/v2/api?chainid=1&module=contract&action=getabi&address=${tokenAddress}&apikey=${process.env.ETHERSCAN_API_KEY}`),
        axios.get(`https://api.etherscan.io/v2/api?chainid=1&module=contract&action=getcontractcreation&contractaddresses=${tokenAddress}&apikey=${process.env.ETHERSCAN_API_KEY}`)
    ])

    if (abiRes.data.status === "1") {
        verified = true;
        abi = JSON.parse(abiRes.data.result)

        if (!isERC20ABI(abi)) {
            throw new Error("Contract does not implement standard ERC-20 interface.")
        }
    } else {
        abi = ERC20ABI as Abi
    }

    const { name, symbol, decimals, owner, totalSupply } = await getDataFromContract(tokenAddress, abi)

    const risks = analysisContract(verified, abi)

    console.log({ totalSupply, owner, name, symbol, decimals, verified, risks, deployer: creatorRes.data.result[0].contractCreator || null })

    return { totalSupply, owner, name, symbol, decimals, verified, risks, deployer: creatorRes.data.result[0].contractCreator || null }

}