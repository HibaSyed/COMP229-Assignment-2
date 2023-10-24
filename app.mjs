import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import posts from "./routes/posts.mjs";

const PORT = process.env.PORT || 3000;
const app = express();
  

app.use(cors());
app.use(express.json());

// Load the /node posts routes
app.use("/api/products", posts);

// Welcome message
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to DressStore application.' });
});


// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});