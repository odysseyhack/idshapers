// const ethEndpoint = "https://rinkeby.infura.io/metamask";
// const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider(ethEndpoint));

export function storeData (txData) {
  var rawTransaction = {
    "from": "0x123",
    "to": "0x321",
    "data": {
      "claim": "PASSENGER",
      "revocationData": "2019.04.20"
    },
    "value": 0,
    "gas": 200000,
  };

  console.log("STORED REVOCATION TO BLOCKCHAIN");

  return true;

  // web3.eth.accounts.signTransaction(rawTransaction, "12345")
  // .then(console.log);
}


export function retrieveRevocations (userId) {
  var data = [
    "data": {
      "claim": "PASSENGER",
      "revocationData": "2019.04.20"
    },
    "data": {
      "claim": "AIRPORTCHECKIN",
      "revocationData": "2019.05.20"
    }
  ];
  console.log("RETURNED REVOCATION:" + data);
  return data;
}