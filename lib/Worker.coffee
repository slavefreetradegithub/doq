fs = require('fs')
require('dotenv').load()

say = require('say.js').prod

solc = require('solc')

class Worker
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
    console.log 'this compile ->', this.compile()
    return this.compile().contracts[':Worker']

  abi: () ->
    console.log 'abi ->', this.contract()
    return JSON.parse this.contract().interface 

  main: () ->
    return  this.web3.eth.contract( this.abi() )#, 
    #   from: this.from
    #   gasPrice: '20000000000000'
    #   gas: 1000000
    # )

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
  # account1: 
  #   id: this.web3.eth.accounts[0]
  #   balance: JSON.parse this.web3.eth.getBalance this.web3.eth.accounts[0]
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

module.exports = Worker
