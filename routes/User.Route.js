const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/User.Model")

const signupController = express.Router();
const signinController = express.Router();

signupController.post("/signup", async (req, res) => {

    const { email, password } = req.body;
    const isEmail = await UserModel.findOne({ email });

    if (!isEmail) {
        bcrypt.hash(password, 5, async (error, hash) => {
            if (error) {
                return res.status(500).send({ message: "Something went wrong" });
            }
            const user = new UserModel({
                email,
                password: hash,
            });
            try {
                await user.save();
                return res.status(201).send({ message: "Signup successfully" });
            } catch (error) {
                return res.status(500).send({ message: "Signup failed" });
            }
        });
    } else {
        res.send({
            message: "User already Exists",
        });
    }
});

signinController.post("/signin", async (req, res) => {

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    const hash = user ? user.password : undefined;

    bcrypt.compare(password, hash, (error, result) => {
        if (error) {
            return res.status(404).send({ message: "User not found" });
        }
        if (result) {
            const token = jwt.sign({ email: email }, process.env.KEY);
            return res.status(200).send({ message: "Login successful", token: token });
        } else {
            return res
                .status(401)
                .send({ message: "“Invalid Credentials, please login again" });
        }
    });
});

module.exports = { signupController, signinController };