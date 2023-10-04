import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

// for initialize
router.post("/initialize", async (req, res) => {
  let newDocument = {
    random_seed: req.body.random_seed,
    initializer: req.body.initializer,
    taker: req.body.taker,
    initializer_mint: req.body.initializer_mint,
    taker_mint: req.body.taker_mint,
    initializerDepositTokenAccount: req.body.initializerDepositTokenAccount,
    initializerReceiveTokenAccount: req.body.initializerReceiveTokenAccount,
    takerDepositTokenAccount: req.body.takerDepositTokenAccount,
    takerReceiveTokenAccount: req.body.takerReceiveTokenAccount,
    initializer_amount: req.body.initializer_amount,
    taker_amount: req.body.taker_amount
  };
  let collection = await db.collection("transactions");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(200);
});

// for cancel
router.post("/cancel", async (req, res) => {
  // const query = { _id: new ObjectId(req.params.id) };
  const query = {
    initializer: req.body.initializer,
    initializer_mint: req.body.initializer_mint,
    initializerDepositTokenAccount: req.body.initializerDepositTokenAccount
  };

  const collection = db.collection("transactions");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

// get offer
router.post("/offer", async (req, res) => {
  let newDocument = {
    initializer: req.body.initializer
  };
  let collection = await db.collection("transactions");
  let result = await collection.find(newDocument).toArray();
  res.send(result).status(200);
});

// get request
router.post("/request", async (req, res) => {
  let newDocument = {
    taker: req.body.initializer
  };
  let collection = await db.collection("transactions");
  let result = await collection.find(newDocument).toArray();
  res.send(result).status(200);
});

export default router;
