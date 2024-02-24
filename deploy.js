const fs = require('fs');
const solc = require('solc');
const { Web3 } = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const privateKey = 'c6699eed9a0d33c68d25ac5d843c671aed43cf797395f7d28b53dcac6c8654d9'; // Ganti dengan kunci privat Anda
const providerOrUrl = 'https://goerli.infura.io/v3/d135d94519b342329bff2a4e334306bf';

const provider = new HDWalletProvider(privateKey, providerOrUrl);
const web3 = new Web3(provider);

const content = fs.readFileSync('./MyContract.sol', 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'MyContract.sol': { content }
  },
  settings: {
    outputSelection: { '*': { '*': ['*'] } }
  }
};

async function deploy() {
  try {
    /* 1. Dapatkan Akun Ethereum */
    const [account] = await web3.eth.getAccounts();

    /* 2. Compile Smart Contract */
    const { contracts } = JSON.parse(
      solc.compile(JSON.stringify(input))
    );

    const contract = contracts['MyContract.sol'].MyContract;

    /* 3. Ekstrak ABI dan Bytecode dari Kontrak */
    const abi = contract.abi;
    const bytecode = contract.evm.bytecode.object;

    /* 4. Kirim Smart Contract ke Blockchain */
    const { _address } = await new web3.eth.Contract(abi)
      .deploy({ data: bytecode })
      .send({ from: account, gas: 1000000 });

    console.log("Alamat Kontrak =>", _address);
    console.log("This code created by Ufik");
  } catch (error) {
    console.error("Error during deployment:", error);
  }
}

deploy();