const express = require("express");
const ConnectDB = require("./config/db");
const userRouts = require("./routs/userRouts");

const app = express();
app.use(express.json());

app.use("/api/product", userRouts);

app.get("/", (req, res) => {
  res.send("konichiwa");
});

ConnectDB().then(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log("Server running on port", process.env.PORT || 4000);
  });
});