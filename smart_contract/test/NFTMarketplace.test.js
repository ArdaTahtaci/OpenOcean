import { expect } from 'chai'
import hre from "hardhat"

describe('NFTMarketplace', async () => {

    let deployer, addr1, addr2, nft, marketplace
    let feePercent = 1

    beforeEach(async () => {

        [deployer, addr1, addr2] = await hre.ethers.getSigners()

        nft = hre.ethers.deployContract("NFT")
        marketplace = hre.ethers.deployContract("Marketplace")
    })
    describe('Deployment', () => {
        it("Should track name and symbol of the nft collection", async () => {
            expect(await nft.name().to.equal("OpenOcean"))
            expect(await nft.symbol().to.equal("OPC"))
            console.log(nft.name())

        })
    })
})

