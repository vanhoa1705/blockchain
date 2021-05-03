import { Transaction } from "./../class/Transaction";
import { BlockChain } from "./../class/BlockChain";
import express from "express";
const BlockChainRouter = express.Router();
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const blockChain = new BlockChain();
blockChain.difficulty = 3;

BlockChainRouter.post("/init", async function (req, res) {
  blockChain.minePendingTransactions(req.body.publicKey);
  res.json({ blockChain: blockChain });
});

BlockChainRouter.get("/balance/:publicKey", async function (req, res) {
  let balance = blockChain.getBalanceOfAddress(req.params.publicKey);
  res.json({ balance: balance });
});

BlockChainRouter.post("/send", async function (req, res) {
  console.log(req.body);
  let transaction = new Transaction(
    req.body.fromPublicKey,
    req.body.toPublicKey,
    req.body.amount
  );
  transaction.signTransaction(req.body.privateKey);
  blockChain.addTransaction(transaction);

  res.json({ success: true });
});

BlockChainRouter.get("/pendingTransactions", async function (req, res) {
  let pendingTransactions = blockChain.pendingTransactions;
  res.json({ pendingTransactions: pendingTransactions });
});

BlockChainRouter.post("/minePendingTransactions", async function (req, res) {
  blockChain.minePendingTransactions(req.body.publicKey);
  res.json({ success: true });
});

export { BlockChainRouter };
