import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSyncProviders } from "../hooks/useSyncProviders"


type ContextType = {
  providers: EIP6963ProviderDetail[]
  selectedWallet: EIP6963ProviderDetail | undefined
  userAccount: string
  handleConnect: (providerWithInfo: EIP6963ProviderDetail) => Promise<void>
  disconnect: () => Promise<void>
}

export const WalletContext = createContext<ContextType>({
  providers: [],
  selectedWallet: undefined,
  userAccount: "",
  handleConnect: async (providerWithInfo: EIP6963ProviderDetail) => { },
  disconnect: async () => { }
})

export const ethereum = (window as any).ethereum

function WalletContextProvider({ children }) {

  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail | undefined>(undefined)
  const [userAccount, setUserAccount] = useState<string>('')
  const providers = useSyncProviders()


  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {

    const accounts = await providerWithInfo.provider
      .request({ method: 'eth_requestAccounts' })
      .catch(console.error)

    if (accounts?.[0]) {
      setSelectedWallet(providerWithInfo)
      setUserAccount(accounts?.[0])

    }
  }

  const disconnect = async () => {


    setSelectedWallet(undefined)
    setUserAccount("")


  }

  return (
    <WalletContext.Provider value={{ providers, selectedWallet, userAccount, handleConnect, disconnect }}>
      {children}

    </WalletContext.Provider>
  )
}


const useWalletContext = () => useContext(WalletContext)

export { WalletContextProvider, useWalletContext }
