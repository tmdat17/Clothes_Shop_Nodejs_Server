const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const authController = {
    // [POST] /user/register (sign up)
    registerUser: async (req, res) => {
        try {
            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashed_password = await bcrypt.hash(req.body.password, salt);
            const hashed_accept_password = await bcrypt.hash(
                req.body.accept_password,
                salt
            );
            if (hashed_password !== hashed_accept_password) {
                res.status(400).json(
                    "Mật khẩu và xác nhận mật khẩu không chính xác"
                );
                return;
            }
            // Create new user
            const newUser = await new User({
                fullname: req.body.fullname,
                phone: req.body.phone,
                birthday: req.body.birthday,
                password: hashed_password,
                accept_password: hashed_accept_password,
            });
            console.log("create.....");
            // save to mongoose
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [POST] /user/login (login)
    loginUser: async (req, res) => {
        try {
            // tim theo sdt
            const user = await User.findOne({ phone: req.body.phone });
            if (!user) {
                res.status(404).json("Wrong numberphone!!!");
                return;
            }
            // compare password user input and password in mongoose
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                res.status(404).json("Wrong password");
                return;
            }
            if (user && validPassword) {
                res.status(200).json(user);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = authController;
