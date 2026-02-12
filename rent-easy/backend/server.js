const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()    // loads your .env file

const app = express()

app.use(express.json())   // lets your server read JSON from requests



app.use("/",userroutes);


connectDB().then(() => {
    app.listen(process.env.PORT || 7890, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    })
}); // connects to MongoDB
