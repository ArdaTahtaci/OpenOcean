
import hre from "hardhat"

const main = async () => {

  console.log()

  // const nft = await hre.ethers.deployContract("NFT");
  const marketplace = await hre.ethers.deployContract("Marketplace", [1]);

  // const nftAddress = await nft.getAddress()
  const marketAdress = await marketplace.getAddress()

  console.log("NFT: " + " \n " + "market:" + marketAdress)

  // nft.getAddress().then((address) => console.log("NFT address: " + address))
  // marketplace.getAddress().then((address) => console.log("Marketplace address: " + address))

  // console.log("NFT Contract deployed to: " + nft.getAddress());
  // console.log("Marketplace Contract deployed to: " + marketplace.getAddress());

}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()
