import React from 'react'
import ethLogo from "../assets/ethLogo.png"

interface IInfoBoxProps {
    type: string
    value: string
    logo?: boolean
    percentage?: number
}

export default function InfoBox(props: IInfoBoxProps) {
    return (
        <div className='info-box'>
            <span className='info-type'>
                {props.type}
            </span>
            <span className='info-value'>
                {props.logo && <img src={ethLogo} className='me-2' width={20} height={20} />}
                {props.value}
                {props.percentage && <span className='ms-2' style={{ color: "rgb(189, 241, 37)" }}>+{props.percentage}%</span>}
            </span>
        </div>
    )
}
