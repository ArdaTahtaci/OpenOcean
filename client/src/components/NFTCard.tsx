import React from 'react'
import ethLogo from "../assets/ethLogo.png"

interface INFTCardProps {
    img: string
    name: string
    price: number
}

export default function NFTCard(props: INFTCardProps) {
    return (
        <div className='card nft-card'>
            <div className='card-img-top'>
                <img className='nft-img' src={props.img} width={"100%"} height={"100%"} />
            </div>
            <div className='card-body'>
                <span>{props.name}</span>
                <p className='price'>
                    <img className='me-2' src={ethLogo} width={20} height={20} />
                    {props.price}
                </p>
            </div>
        </div>
    )
}
