# Deploy a Contract in Qtum
Deploy a simple Smart Contract in Qtum’s `Regtest` mode. To deploy a contract, you will need the contract's bytecode and ABI, generated using `solc`. Finally, you’ll invoke its methods in JavaScript using _qweb3.js_.

## Requirements
*	Solidity		v0.6.4 (solc)
*	[Qtum](https://github.com/qtumproject/qtum/releases/tag/mainnet-ignition-v0.19.0)		v0.19.0.1
*	QWeb3		v1.2.2
*	NodeJS		v13.5.0
*	NPM		v6.13.4

## Generate Bytecode and ABI
1.	Create a folder on your preferred location. From this point onwards, we will refer to this as your workspace.
2.	Implement a simple storage contract.
 
Install `solc` if you don’t have it, yet. Don’t forget to run the command as an administrator.
```sh
$ npm install -g solc@0.6.4
```
Compile the contract. This will generate the bytecode and ABI files on your workspace.
```sh
$ solcjs SimpleStorage.sol --bin --abi
```
You will need the bytecode later to deploy the contract and the ABI to interact with it.

## Run Qtum regtest
1.	Download Qtum 0.19.0.1 from their [GitHub](https://github.com/qtumproject/qtum/releases/tag/mainnet-ignition-v0.19.0) repository. It’s more convenient to download the zip file for your platform.
 	 
2.	Extract the archive on your workspace and open up a new terminal on that location.
*	For MacOS users, run the following command to extract the archive:
```sh
$ tar xvzf qtum-0.19.0.1-osx64.tar.gz
```

3. Go to the `bin` folder and run the `qtum daemon` on `regtest mode` with username, password and port.
If you want, you can set your data directory to point at your desired location.

> NOTE: Remember not to close this terminal for the rest of the activity.
```sh
$ ./qtumd --regtest --datadir=. --rpcuser=username --rpcpassword=password --rpcport=13889
```

4.	The Qtum `regtest mode` provides the option to generate blocks in order to speed up the process using `PoW` during testing. To generate an account, `launch a new terminal` on the same location and interact with the daemon using `qtum-cli` with the following command:
```sh
$ ./qtum-cli --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 getnewaddress
```

5.	Get test QTUMs. The command is: `generatetoaddress 600 your_generated_address`<br/>
This will mine 600 blocks and the block reward will go to the specified address. 

> NOTE: This command may take some time as qtum-core mines new blocks. If you examine the qtumd.exe terminal, you’ll see the mining process happening.
```sh
$ ./qtum-cli --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 generatetoaddress 600 qN1ipWSFoEhKbigPUcirHxpTbehkpWiiM6
```

6.	To check the wallet's address and current balance, type `getwalletinfo`.
```sh
./qtum-cli --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 getwalletinfo
```

## Deploy Contract
1.	To deploy the contract, call `createcontract` with the bytecode found in your workspace folder named: _SimpleStorage_sol_SimpleStorage.bin_
```sh
$ ./qtum-cli --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 createcontract 6080604052348015610011576000600...
```
The result of this command is a JSON, storing the `transaction hash`, `sender address`, `hash160` and the `address` of the contract.
 
At this point, save the following as we will use them later:
*	`tx_id`	- The transaction ID
*	`sender`		- The contract creator
*	`address` 	- The contract address

2.	Mine one block:
```sh
$ ./qtum-cli --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 generatetoaddress 1 qN1ipWSFoEhKbigPUcirHxpTbehkpWiiM6
```
 
3.	Check whether the transaction is confirmed using `gettransaction`:
```sh
$ ./qtum-cli --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 gettransaction INSERT_TRANSACTION_ID
```
 
4.	Check what is behind the address of the contract using `getaccountinfo`:
```sh
$ ./qtum-cli --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 getaccountinfo INSERT_CONTRACT_ADDRESS
```

## Interact with the Contract
1.	On your workspace, initialize a new NPM project. Then, install `qweb3.js`:
```sh
$ npm init –y
$ npm install qweb3@1.2.2
```
2.	Create a file named _client.js_ and start implementing the client. First, import the necessary dependencies.
 
3.	Create the contract instance using the contract `address`, `abi` and `rpc`. Copy the ABI generated from `solc`.
 
4.	Set the variables in the transaction object and send it.
 
5.	Run the client. Open a terminal on the workspace and run:
```sh
$ node client.js
```
This returns a transaction receipt of the transaction.

6.	Get the value of the contract. Let’s reuse _client.js_ but comment out the `set` implementation.
 
7.	 Run client.js.
```sh
$ node client.js
```

The result is successfully retrieved. If the result is still not reflected, you have to mine a new block which can be accomplished by the `generatetoaddress` qtum-cli command earlier.

## Module
MI4: Module 6: E1
