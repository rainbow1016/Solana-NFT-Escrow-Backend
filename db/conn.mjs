import { MongoClient } from "mongodb";

// const connectionString = process.env.ATLAS_URI || "";
const password = encodeURIComponent("%TGB5tgb");
const connectionString = `mongodb+srv://rainbow1016:${password}@cluster0.4c3rghv.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Connecting to MongoDB Atlas...", connectionString);
} catch (e) {
  console.error(e);
}

let db = conn.db("Solana_NFT_trading_transactions");

export default db;
