require("dotenv").config();
const express = require("express");
const ConnectDB = require("./config/db");
const productRouts = require("./routs/ProductRouts");
const userRoutes = require("./routs/userRouts");
const rentRouts = require("./routs/RentRouts");
const issueRouts = require("./routs/issueRouts");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://rent-easy-fe.vercel.app" //frontend url
  ],
  credentials: true
}));

app.use("/api/product", productRouts);
app.use("/api/user", userRoutes);
app.use("/api/rent", rentRouts);
app.use("/api/issue", issueRouts);

// Connect to DB
ConnectDB();

// For local development
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ✅ Required for Vercel
module.exports = app;