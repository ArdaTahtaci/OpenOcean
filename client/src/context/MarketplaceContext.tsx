import React, { createContext, useContext, useDebugValue, useEffect, useState } from 'react'
import { WalletContextProvider, useWalletContext } from './WalletContext'
import { ethers } from "ethers"
import { marketplaceAbi, marketplaceAddress } from "../constants/constants"
import { ethereum } from "./WalletContext"

type ContextType = {
    setMarketContract: () => void

}

export const MarketplaceContext = createContext<ContextType>({
    setMarketContract: () => { },
})

function MarketplaceContextProvider({ children }) {


    const { userAccount } = useWalletContext()

    const [writeNftContract, setWriteNftContract] = useState<ethers.Contract | undefined>()
    const [readNftCOntract, setReadNftCOntract] = useState<ethers.Contract | undefined>()
    const [signer, setSigner] = useState<ethers.JsonRpcSigner>()

    const setMarketContract = async () => {

        if (userAccount) {

            let signer: ethers.JsonRpcSigner | undefined
            const provider = new ethers.BrowserProvider(ethereum)

            try {
                const rpcSigner = await provider.getSigner()
                signer = rpcSigner
                setSigner(rpcSigner)

                provider.getSigner().then((rpcSigner) => {
                    signer = rpcSigner
                    if (signer) setSigner(signer)
                })

                const writeContract = new ethers.Contract(marketplaceAddress, marketplaceAbi, await signer)
                const readContract = new ethers.Contract(marketplaceAddress, marketplaceAbi, provider)

                setWriteNftContract(writeContract)
                setReadNftCOntract(readContract)


            } catch (error) {
                console.log(error.message)
            }
        }
        else {
            console.log("There is no account")
        }
    }

    return (

        <MarketplaceContext.Provider value={{ setMarketContract }}>
            {children}
        </MarketplaceContext.Provider>


    )
}


const useMarketContext = () => useContext(MarketplaceContext)

export { MarketplaceContextProvider, useMarketContext }