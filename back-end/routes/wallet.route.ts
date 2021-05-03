import express from "express";
import { Wallet } from "../class/Wallet";
const WalletRouter = express.Router();
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

WalletRouter.get("/", async function (req, res) {
  const myWallet = new Wallet();
  res.json({
    publicKey: myWallet.publicKey,
    privateKey: myWallet.privateKey,
  });
});

WalletRouter.post("/", async function (req, res) {
  const key = ec.keyFromPrivate(req.body.privateKey);
  let publicKey = key.getPublic("hex");
  res.json({
    publicKey: publicKey,
  });
});

export { WalletRouter };
