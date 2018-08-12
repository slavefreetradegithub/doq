'use strict'
const fs = require('fs')

require('coffee-script/register')
var cc = require('./lib/Contract')
var Contract = new cc(fs.readFileSync('./contracts/returnable.sol').toString())
var contractInstance = Contract.instance()



exports.regTx = () => {
// can be 'latest' or 'pending'
  var changes = Contract.eth.filter('pending')
// OR object are log filter options
// var filter = web3.eth.filter(options);

// watch for changes
  changes.watch(function (error, result) {
    if (!error) {
      console.log('change made ->', result)
    }
    let tx = Contract.eth.getTransaction(result)
    console.log('tx ->', tx)
    let rcpt = Contract.eth.getTransactionReceipt(result)
    console.log('recipt ->', rcpt)
  })

// Returns the block hash for the tx above
  var confirms = Contract.eth.filter('latest')
  confirms.watch((error, result) => {
    if (!error) console.log('latest ->', result)
  });
  contractInstance.foo.call(2, {from: Contract.from})

  contractInstance.foo.sendTransaction(2, {from: Contract.from}, function (err, res) {
    if (err) {
      console.log('err ->', err)
      return
    }
    console.log('result ->', res)
  })
}
//
// var returnValue = JSON.parse( contractInstance.foo.call(2) );
//
// console.log('simulate return value ->', returnValue)

// function startListen () {
//   var event = contractInstance.ReturnValue({value: 23}, function (error, result) {
// 	  if (error) {
// 	  	console.log('error ->', error)
// 	  	return
// 	  }
// 	    console.log(result)
// 	    console.log('value ->', result.value)
// 	    return
//   })
// }
// startListen()

exports.contractor = () => {


  let _value = 2
//
contractInstance.foo.call(_value, {_value: 2, from: Contract.from  })

  let exampleContract = Contract.main()
  let data = Contract.contract().bytecode
  let example = exampleContract.new(_value, {
    from: Contract.accounts[0],
    data: '0x' + data,
    gas: 300000
  }, function (e, contract) {
    if (!e) {
      if (!contract.address) {
        console.log('Contract transaction send: TransactionHash: ' + contract.transactionHash + ' waiting to be mined...')
        contractInstance.foo.sendTransaction(_value, {_value: 2, from: Contract.from  })
      } else {
        console.log('Contract mined! Address: ' + contract.address)
        return process(contract)
      }
    }
  })
  let process = (contract) => {
    console.log('process contract ->', contract)
  }

//
  function finish() {
  }

  setTimeout(finish, 3000)
}


// can run: this.regTx() || this.contractor()
this.regTx()
// this.contractor()
