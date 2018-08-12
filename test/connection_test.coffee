fs = require('fs')
cc = require('../lib/Contract')
Contract = new cc(fs.readFileSync('./contracts/returnable.sol').toString())

chai = require('chai');
should = chai.should();

describe "Transfer ether from one account to another", ->
  it 'should get the balances before the the transfer for first 2 accounts', ->
    console.log 'account1 balance ->', Contract
    Contract.accounts.should.be.an('Array')

#  it 'should get the balances before the the transfer for first 2 accounts', ->
#    console.log 'account2 balance ->', Contract.account2.balance

#    Contract.account2.should.be.an('Object')
