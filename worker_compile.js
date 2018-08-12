'use strict'

let fs = require('fs')
require('coffee-script/register')
var Work = require('./lib/Worker')
var Worker = new Work(fs.readFileSync('./contracts/worker.sol').toString())


let _workerAddress = '0x4ba53ab549e2016dfa223c9ed5a38fad91288d07'

let workerCompiled = Worker.main()

let data = Worker.contract().bytecode

console.log('byte code ----------------------------------------------------------------------------')

console.log(data)

console.log('from ->', Worker.accounts)

workerCompiled.new(_workerAddress, {from: Worker.accounts[0], data: '0x' + data, gas: 300000}, function (e, contract) {
  if (!e) {
    if (!contract.address) {
      console.log('Contract transaction send: TransactionHash: ' + contract.transactionHash + ' waiting to be mined...')
    } else {
      console.log('Contract mined! Address: ' + contract.address)
      return process(contract)
    }
  }
})


let process = (contract) => {
  console.log('todo: capture the contract address, use it elsewhere', contract)
  // let myContract = contract.abi
  // let getData = contract.work.getData()
  // greeterCompiled.eth.sendTransaction({to: '0x09d36aa889771c1d92f9cced332568f12ccd2a50', data: getData})
}
