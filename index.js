const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { signupController, signinController } = require("./routes/User.Route");
const { bugController } = require("./routes/Dashboard.Route");
const { authentication } = require("./middleware/authentication");

const app = express()
app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected successfully");
    } catch (err) {
        console.log("Failed to connect with DB");
        console.log(err);
    }
    console.log(`listening on Port :  ${PORT}`);
});

app.use(cors())
app.use("/user", signupController);
app.use("/user", signinController);
app.use("/bug", bugController)
app.use(authentication)