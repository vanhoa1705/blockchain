import { Wallet } from "./class/Wallet";
import express from "express";
import { BlockChain } from "./class/BlockChain";
import { Transaction } from "./class/Transaction";
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const app = express();

app.get("/", function (req, res) {
  const myWallet1 = new Wallet(ec.genKeyPair());
  const myWallet2 = new Wallet(ec.genKeyPair());

  const MyCoin = new BlockChain();

  // Mine block
  MyCoin.minePendingTransactions(myWallet1.walletAddress);

  const tx1 = new Transaction(
    myWallet1.walletAddress,
    myWallet2.walletAddress,
    100
  );

  tx1.signTransaction(myWallet1.publicKey);
  MyCoin.addTransaction(tx1);

  // Mine block
  MyCoin.minePendingTransactions(myWallet1.walletAddress);

  // Create second transaction
  const tx2 = new Transaction(
    myWallet1.walletAddress,
    myWallet2.walletAddress,
    80
  );
  tx2.signTransaction(myWallet1.publicKey);
  MyCoin.addTransaction(tx2);

  // Mine block
  MyCoin.minePendingTransactions(myWallet1.walletAddress);
  console.log(
    "myWallet1: " + MyCoin.getBalanceOfAddress(myWallet1.walletAddress)
  );
  console.log(
    "myWallet2: " + MyCoin.getBalanceOfAddress(myWallet2.walletAddress)
  );

  console.log(
    MyCoin.chain.map((block) => {
      console.log(block.transactions);
    })
  );

  res.json({
    message: "Hello World!",
  });
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Sakila api is running at http://localhost:${PORT}`);
});
