import { client } from "./cleint"


export const getTokenData = async (address : string) => {
    await client.readContract({
        abi
    })
}