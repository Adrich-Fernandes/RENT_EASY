const express = require("express");
const ConnectDB = require("./config/db");
const productRouts = require("./routs/ProductRouts");
const userRoutes = require("./routs/UserRouts");
const rentRouts = require("./routs/RentRouts");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/product", productRouts);
app.use("/api/user", userRoutes);
app.use("/api/rent", rentRouts);

ConnectDB().then(() => {
  app.listen(4000, () => {
    console.log("Server running on port 4000");
  });
});
