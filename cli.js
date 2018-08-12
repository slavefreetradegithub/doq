// cli.js
require('dotenv').load();
const program = require('commander');

const Web3 = require('web3');

let web3 = new Web3();

const say = require('say.js').dev;

web3.setProvider(new web3.providers.HttpProvider(process.env.RPC_ADDR));

console.log('connected ->', web3.isConnected())

program.version('0.1.0').option('-r, --receipt', 'Tx Receipt')
  .option('-t --transaction', 'Tx info')
  .option('-r --receipt', 'Get tx receipt')
  .option('-c --contractBal [address]', 'Balance at contract address')
  .option('-a --accounts', 'Account listings')
  .option('-b --balance', 'Balance at first address')
  .option('-n --number', 'Current block number')
  .option('-p --peers', 'Get list of peers')
  .option('-s --sync', 'Get sync status').parse(process.argv)

if(program.args.length === 0 && program.rawArgs.length < 3) {
  console.log('no arguments, try passing --help.');
}

if (program.receipt) {
  info = web3.eth.getTransactionReceipt(program.args[0]);
  console.log('fetching the receipt...');
  console.log(' - ', info);
}

if (program.transaction) {
  info = web3.eth.getTransaction(program.args[0]);
  console.log('fetching the tx...');
  console.log(' - ', info);
  console.log('value ->', web3.fromWei(info.value, 'ether').toString())
  say('[v]:', web3.toUtf8(info.r))
}

if (program.accounts) {
	info = web3.eth.accounts;
	console.log('[ACCOUNTS]', info)
}

if (program.number) {
  info = web3.eth.blockNumber
  console.log('[BLOCK #]', info)
}

if (program.peers) {
  info = web3.net.peerCount
  console.log('[PEERS #]', info)
}

if (program.balance) {
  var account = web3.eth.accounts[0];
  balance = web3.fromWei(web3.eth.getBalance(account), "ether");
  result = balance.toNumber()
  console.log('[BALANCE]', result)
}
if (program.contractBal) {
  console.log('asking for ->', program.contractBal)
  var account = program.contractBal
  balance = web3.fromWei(web3.eth.getBalance(account), "ether")
  var result = balance.toNumber()
  console.log('[CONTRACT BALANCE]', result)
}

if (program.sync) {
  let sync = web3.eth.syncing;
  sync = true
  console.log('[SYNC::STATUS]', sync)

}

if (program.connection) {
	info = web3.isConnected()
	  console.log('current provider ->', web3.eth.defaultAccount )

	console.log('[CONNECTED STATUS]', info)
}
