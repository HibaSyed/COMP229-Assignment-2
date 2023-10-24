import { MongoClient } from "mongodb";

// Add your MongoDb connection string below
const connectionString = "mongodb+srv://HibaSyed:Flower101@cluster0.5dg5c2e.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("connected");
} catch(e) {
  console.error(e);
}

let db = conn.db("Marketplace");

export default db;