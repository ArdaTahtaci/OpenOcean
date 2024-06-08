import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'
import React from 'react'
import { useWalletContext } from '../context/WalletContext';

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


export default function DisconnectModel(props: ModelProps) {

    const { disconnect, userAccount } = useWalletContext()

    const handleClick = () => {
        props.handleClose()
        disconnect()
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
                    <div style={{ fontSize: "20px", lineHeight: "35px" }}>
                        <p >
                            Connected Wallet: <span style={{ display: "block", whiteSpace: "normal" }}>{userAccount.substring(0, 7) + ". . . . . . . ." + userAccount.substring(userAccount.length - 8, userAccount.length)}</span>
                        </p>
                    </div>
                    <Typography id="transition-modal-title" variant="h6" component="h2" fontSize={14} color={"red"}>
                        This is not really disconnect your wallet. You need to do it manually.
                    </Typography>

                    <hr />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button className='btn connect-btn mx-auto' onClick={handleClick}>Disconnect</button>

                    </div>

                </Box>
            </Fade>
        </Modal>
    )
}
