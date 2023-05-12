const jwt = require("jsonwebtoken");
const Users = require("../models/userschema.js");
require("dotenv").config();

const secrectKey = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, secrectKey);
        const user = await Users.findOne({ _id: verifyToken._id });
        if (!user) {
            throw new Error("User not found");
        }

        req.token = token;
        req.user = user;
        req.userId = user._id;
        next();
    } catch (error) {
        res.status(404).send({ message: "JWT AUTH Error", error });
    }
};

module.exports = auth;
