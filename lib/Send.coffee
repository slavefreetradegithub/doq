fs = require('fs')
say = require('say.js').prod
solc = require('solc')

class SendTransfer
  constructor: (data) ->
    Web3 = require('web3')
    web3 = new Web3()
    web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8101'))
    this.coinbase = web3.eth.coinbase
    this.web3 = web3
    this.accounts = web3.eth.accounts
    this.input = data
    this.from = web3.eth.accounts[0]
    # Not used yet?

  compile: () ->
    return solc.compile(this.input, 1)

  contract: () ->
    console.log('contract () ->', )
    return this.compile().contracts[':ethertransfer']

  abi: () ->
    return JSON.parse this.contract().interface 

  main: () ->
    return  this.web3.eth.contract( this.abi()) #, 
    #   gasPrice: '20000000000000000'
    #   gas: 1000000000
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
  #   address: this.accounts[0]
  #   balance: JSON.parse this.web3.eth.getBalance this.web3.eth.accounts[0]
  # account2: 
  #   address: web3.eth.accounts[1]
  #   balance: JSON.parse web3.eth.getBalance web3.eth.accounts[1]


  reader: () ->
    say "contract instance ->", this.instance() 
    say "abi -->", this.abi()
    say "accounts ->", this.accounts
    return

module.exports = SendTransfer
