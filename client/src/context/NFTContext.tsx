import React, { createContext, useContext, useState } from 'react'
import { WalletContextProvider, ethereum, useWalletContext } from './WalletContext'
import { ethers } from 'ethers'
import { nftAbi, nftAddress } from '../constants/constants'
import { createHelia } from 'helia'
import { json } from '@helia/json'

import axios from 'axios'
import fs from 'fs'

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZmI4MDA5NS1lODk1LTQ5NmItYWU4Ny0wY2MxNzU1OTZiNGQiLCJlbWFpbCI6ImFyZGF0YTEyM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZjIyNTg5ZDYwYThjMzNhOWE0YjgiLCJzY29wZWRLZXlTZWNyZXQiOiIyYmIyYTMzMDgxYTNiZGIwYmRmYWM2MTAxNWU3ZTc4OTIyMjQxOTI5N2UzOTg1NmMzMWU1ZDA2ZjMxMWEzMzU5IiwiaWF0IjoxNzEyNjU0NTk3fQ.O0bBdnC_tIrKGXJV3svAPCrXMNkNVpKCMHKNHOsSOhQ"


export interface IPFSData {
    name: string
    description: string
    image: string
}

type ContextType = {
    setNftContract: () => void
    uploadToIPFS: (data: IPFSData) => Promise<void>

}

export const NFTContext = createContext<ContextType>({
    setNftContract: () => Promise<void>,
    uploadToIPFS: async (data: IPFSData) => { }
})

function NFTContextProvider({ children }) {

    const { providers, userAccount, selectedWallet, handleConnect } = useWalletContext()


    const [writeMArketContract, setWriteMArketContract] = useState<ethers.Contract | undefined>()
    const [readMarketCOntract, setReadMArketCOntract] = useState<ethers.Contract | undefined>()
    const [signer, setSigner] = useState<ethers.JsonRpcSigner>()

    const setNftContract = async () => {

        if (userAccount) {

            let signer: ethers.JsonRpcSigner | undefined
            const provider = new ethers.BrowserProvider(ethereum)
            provider.getSigner().then((rpcSigner) => {
                signer = rpcSigner
                if (signer) setSigner(signer)
            })


            const writeContract = new ethers.Contract(nftAddress, nftAbi, await signer)
            const readContract = new ethers.Contract(nftAddress, nftAbi, provider)

            setWriteMArketContract(writeContract)
            setReadMArketCOntract(readContract)


            return {
                writeContract: writeContract,
                readContract: readContract,
                signer: signer
            }
        }
        else {
            console.log("THere is no account")
        }
    }

    // const uploadToIPFS = async (data: IPFSData) => {
    //     if (data.name && data.description && data.image) {
    //         try {
    //             const helia = await createHelia()
    //             const heliaJson = json(helia)

    //             const myImmutableAddress = await heliaJson.add(data)
    //             console.info(myImmutableAddress)
    //             console.log(await heliaJson.get(myImmutableAddress))


    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // }


    const uploadToIPFS = async (data: IPFSData) => {


        const dataToSend = {
            file: data.image,
            pinataMetadata: {
                name: data.name,
                description: data.description
            },
            pinataOptions: {
                cidVersion: 0
            }
        };

        console.log(dataToSend)


        try {
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", dataToSend, {
                maxBodyLength: undefined,
                headers: {
                    'Content-Type': `multipart/form-data`,
                    'Authorization': `Bearer ${JWT}`
                }
            });
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                    maxBodyLength: undefined,
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${boundary}`,
                        'Authorization': `Bearer ${JWT}`
                    }
                });
     */

    return (

        <NFTContext.Provider value={{ setNftContract, uploadToIPFS }}>
            {children}
        </NFTContext.Provider>


    )
}


const useNFTContext = () => useContext(NFTContext)

export { NFTContextProvider, useNFTContext }