'use strict'

let fs = require('fs')
require('coffee-script/register')
var Greet = require('./lib/Greeter')
var Greeter = new Greet(fs.readFileSync('./contracts/greeter.sol').toString())
var greeterInstance = Greeter.instance()

let _greeting = 'Hello World!'

let greeterCompiled = Greeter.main()

// let data = Greeter.contract().assembly['.code']
let data = Greeter.contract().bytecode

console.log('byte code ----------------------------------------------------------------------------')
console.log(data)

console.log('from ->', Greeter.accounts)

let greeter = greeterCompiled.new(_greeting, {from: Greeter.accounts[0], data: '0x' + data, gas: 300000}, function (e, contract) {
  if (!e) {
    if (!contract.address) {
      console.log('Contract transaction send: TransactionHash: ' + contract.transactionHash + ' waiting to be mined...')
    } else {
      console.log('Contract mined! Address: ' + contract.address)
      return process(contract)
    }
  }
})
let greet = () => { return greeter };

setTimeout(greet, 4000)

let process = (contract) => {
  console.log('todo: capture the contract address, use it elsewhere', contract)
  // let myContract = contract.abi
  let getData = contract.greet.getData()
  // greeterCompiled.eth.sendTransaction({to: '0x09d36aa889771c1d92f9cced332568f12ccd2a50', data: getData})
}
