const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDB = () => {
    return mongoose.connect(process.env.DB_URI).then(() => {
        console.log("Connected to:", mongoose.connection.name);
    })
        .catch((err) => {
            console.error("MongoDB Connection Error:", err.message);
            process.exit(1);
        });
};

module.exports = ConnectDB;
