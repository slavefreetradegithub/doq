fs = require('fs')
cc = require('../lib/Contract')
Contract = new cc(fs.readFileSync('./contracts/returnable.sol').toString())
# contractInstance = Contract.instance()

# contract = new Contract('some input')

chai = require('chai');
should = chai.should();

describe "Has reference to self", ->
  it 'should use the constructor properly', ->
    Contract.input.should.be.an('String')

  it 'should return the input', ->
    Contract.compile().should.be.an('Object')

  it 'should return an instance of the contract', ->
    Contract.instance().should.be.an('Object')

  it 'should return accounts', ->
    Contract.accounts.should.be.an('Array')
