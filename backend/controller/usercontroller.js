const Users = require("../models/userschema.js");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        return res.status(422).send({ error: "Please add all the fields" });
    }

    try {
        const existingEmail = await Users.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).send({ message: "Email already exists" });
        }

        const userRegister = new Users({ name, email, password });

        const saveuser = await userRegister.save();

        res.status(200).send({
            message: "Registered Successfully",
            saveuser,
        });
    } catch (error) {
        res.status(404).send({ message: "Internal Server Error", error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ error: "Please add all the fields" });
    }
    try {
        const user = await Users.findOne({ email: email });
        if (user) {
            const passwordCheack = await bcrypt.compare(
                password,
                user.password
            );
            if (passwordCheack) {
                const token = await user.generateToken();
                console.log(token);
                res.status(200).send({ user, token });
            } else {
                res.status(400).send({ message: "Invalid Email or Password" });
            }
        } else {
            res.status(400).send({
                message: "Error in Backend User Controller. Line 47",
            });
        }
    } catch (err) {
        res.status(400).send({ message: "Invalid Credentials. Login Error" });
    }
};

exports.profile = async (req, res) => {
    try {
        const userValidation = await Users.findOne({ _id: req.userId });
        res.status(200).send(userValidation);
    } catch (error) {
        res.status(400).send({ message: "User Validation error" });
    }
};
