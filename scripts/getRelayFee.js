const hre = require("hardhat");
require('dotenv').config()

async function main() {
  const l2GasPriceOracle = '0x37D61987d0281Fb17DE079C9B8E56B367b1800c4'
  const provider = new hre.ethers.providers.StaticJsonRpcProvider(hre.network.config.url)
  const feeMethodId = ethers.utils.id('l2BaseFee()').slice(0, 10)
  const callResult = await provider.call({to: l2GasPriceOracle, data: feeMethodId })
  const baseFee = hre.ethers.BigNumber.from(callResult)
  console.log('l2BaseFee:', hre.ethers.utils.formatEther(baseFee))

  const gasLimit = 500000
  console.log('gasLimit:', gasLimit)

  const fee = baseFee.mul(gasLimit)
  console.log('fee:', hre.ethers.utils.formatEther(fee))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
