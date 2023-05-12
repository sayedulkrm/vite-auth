const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
require("dotenv").config();

// Creating DB Schema

const Schema = new mongoose.Schema({
    name: {
        type: String,

        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

// Token Generation
Schema.methods.generateToken = async function () {
    try {
        let userToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: userToken });
        await this.save();
        return userToken;
    } catch (error) {
        return res
            .status(400)
            .send({ message: "Error in generating token", error });
    }
};

// Password Hashing

Schema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const userModel = mongoose.model("users", Schema);

module.exports = userModel;
