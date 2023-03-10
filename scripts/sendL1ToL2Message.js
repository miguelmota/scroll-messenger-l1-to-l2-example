// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')
require('dotenv').config()

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile')

  // We get the contract to deploy
  const L1Contract = await hre.ethers.getContractFactory('L1Contract')
  const l2ContractAddress = process.env.L2_CONTRACT
  const l1ContractAddress = process.env.L1_CONTRACT
  const greeting = process.env.GREETING
  const l1Contract = L1Contract.attach(l1ContractAddress)

  await l1Contract.deployed()

  // const l2ContractAbi = require('../artifacts/contracts/L2Contract.sol/L2Contract.json').abi
  // const iface = new hre.ethers.utils.Interface(l2ContractAbi)
  // const calldata = iface.encodeFunctionData('setGreeting', [greeting])
  const to = l2ContractAddress
  const fee = hre.ethers.utils.parseEther('0.00001')
  const tx = await l1Contract.sendMessageToL2(to, greeting, {
    value: fee
  })
  console.log(`sent tx hash ${tx.hash}`)
  console.log(`https://goerli.etherscan.io/tx/${tx.hash}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
