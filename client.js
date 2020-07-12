const fs = require('fs');
const {Qweb3} = require("qweb3");
const username = "username";
const password = "password";
const rpcAddress = `http://${username}:${password}@localhost:13889`;
const qweb = new Qweb3(rpcAddress);

const bytecode = '0x' + fs.readFileSync('SimpleStorage_sol_SimpleStorage.bin').toString();
//console.log(bytecode);

const contractAddress = "38584ce43ebe469b1db77fe8c937fc8844e58e05";
let ABI = fs.readFileSync('SimpleStorage_sol_SimpleStorage.abi').toString();
ABI = JSON.parse(ABI);

const contract = qweb.Contract(contractAddress, ABI);

// ============== Comment this out when GETTING ===============
const transaction = {
    methodArgs: [1234567890], // The data which will be saved
    gasLimit: 1000000, // Gas Limit
    senderAddress: "qSJN7N32jxAButZAHXaRcWPYKYkBmbxz9g" // The sender address, also contract owner
};

const methodName = "set";

contract.send(methodName, transaction).then(result => {
    console.log(result);
});
// ============================================================

const transaction = {
    methodArgs: [],
    gasLimit: 1000000,
   senderAddress: "qSJN7N32jxAButZAHXaRcWPYKYkBmbxz9g"
};

const methodName = "get";

contract.call(methodName, transaction).then(result => {
    console.log(result.executionResult.formattedOutput[0].toString());
});
