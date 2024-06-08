import React, { useEffect, useState } from 'react'
import "./styles.css"
import { useNavigate } from 'react-router-dom'
import { useWalletContext } from '../context/WalletContext'
import ConnectModel from './ConnectModel'
import DisconnectModel from './DisconnectModel'
import { useMarketContext } from '../context/MarketplaceContext'
import { useNFTContext } from '../context/NFTContext'

export default function Navbar() {

    const navigate = useNavigate()

    const { selectedWallet, userAccount, disconnect } = useWalletContext()
    const { setMarketContract } = useMarketContext()
    const { setNftContract } = useNFTContext()


    const [connected, setConnected] = useState(false)
    const [open, setOpen] = useState(false);
    const [openDc, setOpenDc] = useState(false)

    const [disconnectHovered, setDisconnectHovered] = useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDcOpen = () => setOpenDc(true);
    const handleDcClose = () => setOpenDc(false);

    useEffect(() => {
        if (userAccount !== "") setConnected(true)
        else setConnected(false)

    }, [userAccount])

    useEffect(() => {
        console.log("selectedWallet: " + selectedWallet + "\nuserAccount: " + userAccount)
        setMarketContract()
        setNftContract()

    }, [selectedWallet, userAccount])

    const handleClick = () => {
        handleOpen()
    }

    const handleDisconnect = () => {
        handleDcOpen()
        // disconnect()
        console.log("DISCONNECTED")
    }

    const handleMouseEnter: React.MouseEventHandler<HTMLButtonElement> = () => {
        setDisconnectHovered(true);
    };

    const handleMouseLeave: React.MouseEventHandler<HTMLButtonElement> = () => {
        setDisconnectHovered(false);
    };


    return (
        <div className='navbar nav'>

            <ConnectModel open={open} handleClose={handleClose} />
            <DisconnectModel open={openDc} handleClose={handleDcClose} />

            <h1 className='my-auto lumanosimo-regular'>OpenOcean</h1>
            <div className='nav-items'>
                <p onClick={() => navigate("/")}>Marketplace</p>
                <p onClick={() => navigate("/create")}>Create</p>
                <p>My Collections</p>
                <p>My Purchases</p>

            </div>
            {!connected ? (
                <button className='btn connect-btn btn-lg' onClick={() => handleClick()}>Connect</button>
            ) : (
                <div>
                    <button
                        className='btn connect-btn disconnect-btn btn-lg'
                        onClick={() => handleDcOpen()}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >

                        {!disconnectHovered ? (
                            userAccount.substring(0, 4) + "......" + userAccount.substring(userAccount.length - 4, userAccount.length)

                        ) : (
                            "Disconnect"
                        )}

                    </button>
                </div>
            )}
        </div>
    )
}
