# Scroll zkEVM Messenger L1->L2 Example

> Send a message from L1 Goerli to L2 [Scroll zkEVM](https://scroll.io/alpha) testnet.

## Example

There's two contracts; `L2Contract.sol` and `L1Contract.sol`

The L1 contract has a method `sendMessageToL2` that sends a message from L1 to L2 contract to set a greeting message on L2 contract.
It sends the encoded calldata to execute `setGreeting` on L2 which can only be called if the message was sent by the L1 contract.

### Files

- [`L1Contract.sol`](./contracts/L1Contract.sol)
- [`L2Contract.sol`](./contracts/L2Contract.sol)
- [`deployL1.js`](./scripts/deployL1.js)
- [`deployL2.js`](./script/deployL2.js)
- [`sendL1ToL2Message.js`](./scripts/sendL1ToL2Message.js)
- [`getGreetingOnL2.js`](./scripts/getGreetingOnL2.js)

## Install

```sh
git clone https://github.com/miguelmota/scroll-messenger-l1-to-l2-example.git
cd scroll-messenger-l1-to-l2-example
npm install
```

### Set Signer

Create `.env`

```sh
PRIVATE_KEY=123...
```

Make sure private key has funds on both Goerli and Scroll zkEVM testnet.

### Compile Contracts

```sh
npx hardhat compile
```

### Deploy L1 Contract

Command

```sh
npx hardhat run --network goerli scripts/deployL1.js
```

Output

```sh
L1Contract deployed to: 0x41Ed7bd26747d2BE681795443C9e76c7fa3f9880
```

### Deploy L2 Contract

Command

```sh
L1_CONTRACT=0x41Ed7bd26747d2BE681795443C9e76c7fa3f9880 \
npx hardhat run --network scroll scripts/deployL2.js
```

Output

```sh
L2Contract deployed to: 0x6310B81901A64DDF04Ca83fc9904Df9833721d4F
```

### Send L1->L2 Message

Command (replace env vars with your values)

```sh
GREETING="hello world" \
L1_CONTRACT=0x41Ed7bd26747d2BE681795443C9e76c7fa3f9880 \
L2_CONTRACT=0x6310B81901A64DDF04Ca83fc9904Df9833721d4F \
npx hardhat run --network goerli scripts/sendL1ToL2Message.js
```

Output

```sh
sent tx hash 0xf684e3bd4f176f86be5ee4664765a1d6af74096eedbbf001ead36bf8302c0bb0
https://goerli.etherscan.io/tx/0xf684e3bd4f176f86be5ee4664765a1d6af74096eedbbf001ead36bf8302c0bb0
```

### Get Greeting on L2

Command (Note: must wait 8-14 minutes after sending from L1 to see updated state on L2)

```sh
L2_CONTRACT=0x6310B81901A64DDF04Ca83fc9904Df9833721d4F \
npx hardhat run --network scroll scripts/getGreetingOnL2.js
```

Output

```sh
greeting: hello world
```

### Send L2->L1 Message

See [https://github.com/miguelmota/scroll-messenger-l2-to-l1-example](https://github.com/miguelmota/scroll-messenger-l2-to-l1-example)

## License

[MIT](./LICENSE) @ [Miguel Mota](https://github.com/miguelmota)
