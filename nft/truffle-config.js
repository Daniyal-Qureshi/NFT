const  projectId= "0x5778E06a2fF5F189de4c45a84D26cb61832dadDd"
const mnemonic="planet auto sign choice ..."


const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the prtruffle migrate --network ropstenovider as a function.
    ropsten: {
      network_id: 3,       // Ropsten's id
      gas: 47000000,        // Ropsten has a lower block limit than mainnet
      port:8545,
      host:"locahost"
    
    },
   },
 };
// require('babel-register');
// require('babel-polyfill');

// module.exports = {
//   networks: {
//     development: {
//       host: "127.0.0.1",
//       port: 9545,
//       network_id: "*" // Match any network id
//     },
//   },
//   contracts_directory: './src/contracts/',
//   contracts_build_directory: './src/abis/',
//   compilers: {
//     solc: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   }
// }
