require('dotenv').load()
fs = require('fs')
say = require('say.js').prod

solc = require('solc')

class Contract
  constructor: (data) ->
    Web3 = require('web3')
    web3 = new Web3()
    web3.setProvider(new web3.providers.HttpProvider(process.env.RPC_ADDR))
    this.coinbase = web3.eth.coinbase
    this.web3 = web3
    this.accounts = web3.eth.accounts
    this.input = data
    this.from = web3.eth.accounts[0]
    this.eth = web3.eth
    # Not used yet?


  compile: () ->
    return solc.compile(this.input, 1)

  contract: () ->
    return this.compile().contracts[':ExampleContract']

  abi: () ->
    return JSON.parse this.contract().interface

  main: () ->
    return  this.web3.eth.contract( this.abi() ) #,
#      from: this.from
#      gasPrice: '20000000000000'
#      gas: 1000000


  instance: () ->
    return this.main().at(this.coinbase)

  ## EVENTS
  event1: () ->
    return this.instance.ReturnValue({
      from: this.from,
      gasPrice: '20000000000000',
      gas: 1000000
    });

  ## ACCOUNTS

  # account2:
  #   id: this.web3.eth.accounts[1]
  #   balance: JSON.parse this.web3.eth.getBalance web3.eth.accounts[1]


  reader: () ->
    # say "contract instance ->", this.instance()
    # say "abi -->", this.abi()
    say "from ->", this.from
    say "coinbase ->", this.coinbase
    say "accounts ->", this.accounts
    return

module.exports = Contract
