const { ethers } = require("ethers");
const { default: provider } = require("./provider");

const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
        const abi = [
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_bet",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_playersLimit",
                  "type": "uint256"
                }
              ],
              "name": "createGame",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "gamesAddr",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            }
          ];
        const gamesFactory = new ethers.Contract(address, abi, provider);

        export default gamesFactory;