import React from 'react'
import Navbar from '../../components/Navbar'
import "./styles.css"
import nft1 from "../../assets/NFTSamples/nft1.avif"
import nft2 from "../../assets/NFTSamples/nft2.avif"
import nft3 from "../../assets/NFTSamples/nft3.jpg"
import nft4 from "../../assets/NFTSamples/nft4.jpg"
import nft5 from "../../assets/NFTSamples/nft5.avif"

import InfoBox from '../../components/InfoBox'
import NFTCard from '../../components/NFTCard'

export default function MainPage() {
    return (
        <div style={{ height: "100vh" }}>
            <Navbar />
            <p className='heading-text'>
                The <span>NFT Marketplace</span> on <br />Ethereum Sepolia
            </p>
            <div className='info-box-container'>
                <InfoBox type='TOTAL SALES' value='1,781' />
                <InfoBox type='TOTAL VOLUME' value='114,060' logo />
                <InfoBox type='WEEKLY SALES' value='137' />
                <InfoBox type='WEEKLY VOLUME' value='4,559' logo percentage={31} />
            </div>

            <div className='hot-collections-container container row'>
                <span className='hot-title'>🔥 Hot Collections</span>
                <span className='hot-subtitle'>Most volume in last 7 days</span>
                <div className='hot-group'>
                    <NFTCard name='Crazy Ape' price={0.2} img={nft1} />
                    <NFTCard name='Prime Ape' price={0.15} img={nft2} />
                    <NFTCard name='Pawsome Pawtraits' price={1.2} img={nft3} />
                    <NFTCard name='Ether Elegance Art' price={0.4} img={nft4} />
                    <NFTCard name='Ape Fusion' price={0.02} img={nft5} />
                </div>
            </div>
        </div>
    )
}
