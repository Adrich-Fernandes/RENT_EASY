const express = require("express");
const ConnectDB = require("./config/db");
const productRouts = require("./routs/ProductRouts");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");



const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/product", productRouts);

app.get("/", (req, res) => {
  res.send("RENT EASE API");
});

ConnectDB().then(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log("Server running on port", process.env.PORT || 4000);
  });
});