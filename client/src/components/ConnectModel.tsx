import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useSyncProviders } from '../hooks/useSyncProviders';
import { useWalletContext } from '../context/WalletContext';
import { useMarketContext } from '../context/MarketplaceContext';
import CircularProgress from '@mui/material/CircularProgress';
import ethLogo from "../assets/ethLogo.png"


interface ModelProps {
    open: boolean
    handleClose: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1C1C1C',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ConnectModel(props: ModelProps) {

    const providers = useSyncProviders()

    const { handleConnect, selectedWallet, userAccount } = useWalletContext()
    const [isConnecting, setIsConnecting] = useState(false)

    useEffect(() => {
        if (userAccount[0] && selectedWallet !== "") props.handleClose()
        setIsConnecting(false)
    }, [userAccount])

    useEffect(() => {

    }, [])

    const handleNavConnect = (provider) => {
        setIsConnecting(true)
        handleConnect(provider)
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}

        >
            <Fade in={props.open}>
                <Box sx={{ ...style, color: "#fff", borderRadius: "20px" }}>
                    {!isConnecting ? (
                        <>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Choose your ethereum wallet
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                Wallets Detected:
                            </Typography>
                            <hr />
                            <>
                                <div>
                                    {
                                        providers.length > 0 ? providers?.map((provider: EIP6963ProviderDetail) => (
                                            <button className='wallet-btn' key={provider.info.uuid} onClick={() => handleNavConnect(provider)} >
                                                <div className='providers-row'>
                                                    <div className='mx-2'>
                                                        <img className='my-auto mx-3' src={provider.info.icon} alt={provider.info.name} width={45} height={45} />

                                                    </div>
                                                    <div className='mx-2'>
                                                        <Typography id="transition-modal-description" sx={{ mt: 2, fontSize: "18px", fontWeight: "600" }}>
                                                            {provider.info.name}
                                                        </Typography>

                                                    </div>
                                                </div>
                                            </button>
                                        )) :
                                            <div>
                                                Please install an ethereum extension wallet.
                                            </div>
                                    }
                                </div>

                                {/* <h2>{userAccount ? "" : "No "}Wallet Selected</h2>
                        {userAccount &&
                            <div>
                                <div>
                                    <img src={selectedWallet.info.icon} alt={selectedWallet.info.name} />
                                    <div style={{ display: "inline" }}>{selectedWallet.info.name}</div>
                                    <div>({userAccount})</div>
                                </div>
                            </div>
                        } */}
                            </></>
                    ) : (<div className='loading-container'>

                        <div className='spinner'>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <CircularProgress size={100} thickness={1.5} />

                                <img src={ethLogo} alt='' width={40} height={40} />

                            </Box>

                            <Typography id="transition-modal-description" sx={{ mt: 2, marginTop: "20px", fontSize: "22px", fontWeight: "600" }}>
                                Connecting
                            </Typography>
                        </div>
                    </div>)}
                </Box>
            </Fade>
        </Modal>
    )
}
