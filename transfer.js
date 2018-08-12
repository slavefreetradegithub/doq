// transfer.js

require('coffee-script/register')
var fs = require('fs');
var Transfer = require('./lib/Send')
var teller = new Transfer(fs.readFileSync('./contracts/transfer.sol').toString())
// var transferInstance = transfer.instance()

// var Web3 = require('web3');
// create an instance of web3 using the HTTP provider.
// NOTE in mist web3 is already available, so check first if its available before instantiating
// var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8101"));

let fromAddress = teller.accounts[0]

console.log('to address ->', fromAddress )

let transferContract = teller.main();

let data = teller.contract().bytecode

console.log('compiled bytecode ->', transferContract)

let _address = "0x09d36aa889771c1d92f9cced332568f12ccd2a50"
// let isAddress = web3.isAddress(address)
// console.log('is address ->', isAddress)

transferContract.new(_address,2,{from: teller.accounts[0], data: '0x'+ data, gas: 300000}, function(e, contract){
    if(!e) {

      if(!contract.address) {
        console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

      } else {
        console.log("Contract mined! Address: " + contract.address);
        console.log(contract);
      }

    }
})


// transfer.fundtransfer.sendTransaction();
// function send() {
//     transfer.fundtransfer
// }


// setTimeout(send, 3000)
