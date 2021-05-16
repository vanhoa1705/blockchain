const express = require("express");
const app = express();
const http = require("http");
const crypto = require("crypto");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const morgan = require("morgan");
var server = http.createServer(app);
const { Blockchain, Transaction, Block } = require("./blockchain");
var Request = require("request");

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const ioClient = require("socket.io-client");

const port = process.env.PORT || process.argv[2];

var server = app.listen(port, function () {
  console.log("listening to port: " + port);
});

const nodes = [];
var io = require("socket.io")(server);
var client = ioClient("http://localhost:" + process.argv[4]);

let myCoin = new Blockchain();
// socket.emit("init-blockchain", JSON.stringify(myCoin.get));

// client.on("init-blockchain", (data) => {
//   console.log(data);
// });

Request.get(
  `http://localhost:${process.argv[4]}/block-chain`,
  (error, response, body) => {
    if (body) {
      myCoin.chain = JSON.parse(body).blockchain.chain;
    }
  }
);

Request.get(
  `http://localhost:${process.argv[4]}/block-chain/pendingTransactions`,
  (error, response, body) => {
    if (body) {
      myCoin.pendingTransactions = JSON.parse(body).pendingTransactions;
    }
  }
);

io.on("connection", (socket) => {
  console.log("New user connected: " + socket.id);

  let myKey;
  let myWalletAddress;

  app.get("/wallet", (req, res) => {
    myKey = ec.genKeyPair();
    myWalletAddress = myKey.getPublic("hex");

    const newBlock = myCoin.minePendingTransactions(myWalletAddress);

    client.emit("new-block", JSON.stringify(newBlock));
    client.emit("mine-transaction", "");

    res.json({
      publicKey: myWalletAddress,
      privateKey: myKey.getPrivate().toString(16),
    });
  });

  app.post("/wallet", (req, res) => {
    myKey = ec.keyFromPrivate(req.body.privateKey);
    myWalletAddress = myKey.getPublic("hex");

    res.json({
      publicKey: myWalletAddress,
    });
  });

  client.on("new-block", (newBlock) => {
    let block = JSON.parse(newBlock);
    if (myCoin.getLatestBlock().index != block.index) myCoin.addBlock(block);
  });

  socket.on("new-block", (newBlock) => {
    let block = JSON.parse(newBlock);
    if (myCoin.getLatestBlock().index != block.index) myCoin.addBlock(block);
  });

  client.on("new-transaction", (newTransaction) => {
    console.log("client");
    console.log(newTransaction);
    let transaction = JSON.parse(newTransaction);
    socket.emit("new-transaction", newTransaction);
    myCoin.pendingTransactions.push(transaction);
  });

  socket.on("new-transaction", (newTransaction) => {
    console.log("socket");
    let transaction = JSON.parse(newTransaction);
    socket.emit("new-transaction", newTransaction);
    myCoin.pendingTransactions.push(transaction);
  });

  client.on("mine-transaction", () => {
    socket.emit("mine-transaction", "");
    myCoin.pendingTransactions = [];
  });

  socket.on("mine-transaction", () => {
    socket.emit("mine-transaction", "");
    myCoin.pendingTransactions = [];
  });

  app.get("/public-key", (req, res) => {
    res.json({
      publicKey: myWalletAddress,
    });
  });

  app.post("/block-chain/init", (req, res) => {
    const newBlock = myCoin.minePendingTransactions(myWalletAddress);

    client.emit("new-block", JSON.stringify(newBlock));

    client.emit("mine-transaction", "");
    res.json({
      blockchain: myCoin,
    });
  });

  app.get("/block-chain", (req, res) => {
    res.json({
      blockchain: myCoin,
    });
  });

  app.get("/block-chain/balance", async function (req, res) {
    let balance = myCoin.getBalanceOfAddress(myWalletAddress);
    res.json({ balance: balance });
  });

  app.post("/block-chain/send", async function (req, res) {
    let transaction = new Transaction(
      req.body.fromPublicKey,
      req.body.toPublicKey,
      req.body.amount
    );
    transaction.signTransaction(myKey);
    let newTransaction = myCoin.addTransaction(transaction);
    if (newTransaction.status && newTransaction.status == 1) {
      return res.status(400).json({
        message: newTransaction.message,
      });
    }
    client.emit("new-transaction", JSON.stringify(newTransaction));
    io.emit("new-transaction", JSON.stringify(newTransaction));

    res.json({ success: true });
  });

  app.get("/block-chain/pendingTransactions", async function (req, res) {
    let pendingTransactions = myCoin.pendingTransactions;
    res.json({ pendingTransactions: pendingTransactions });
  });

  app.post("/block-chain/minePendingTransactions", async function (req, res) {
    const newBlock = myCoin.minePendingTransactions(myWalletAddress);
    client.emit("new-block", JSON.stringify(newBlock));
    client.emit("mine-transaction", "");
    io.emit("mine-transaction", "");
    io.emit("new-block", JSON.stringify(newBlock));
    res.json({ success: true });
  });

  app.get("/block-chain/history", async function (req, res) {
    let history = [];
    for (let i = 0; i < myCoin.chain.length; i++) {
      for (let j = 0; j < myCoin.chain[i].transactions.length; j++) {
        if (
          myCoin.chain[i].transactions[j].fromAddress == myWalletAddress ||
          myCoin.chain[i].transactions[j].toAddress == myWalletAddress
        ) {
          history.push(myCoin.chain[i].transactions[j]);
        }
      }
    }
    res.json({
      history: history,
    });
  });
  socket.on("disconnect", () => {
    console.log(`User: ${socket.id} was disconnected`);
  });
});
