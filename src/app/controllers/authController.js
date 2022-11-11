const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

let refreshTokens = [];
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
            // save to mongoose
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                admin: user.admin,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "3d" }
        );
    },

    //GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                admin: user.admin,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
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
            // compare password user input and password in mongoose (xác thực pw)
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                res.status(404).json("Wrong password");
                return;
            }
            if (user && validPassword) {
                // khi nhập đúng phone và password thì mới tạo jwt
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);

                refreshTokens.push(refreshToken);

                // lưu refreshToken qua Cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true, // cookie này là httpOnly cookie
                    secure: false, // khi nào deploy thì set lại true
                    path: "/", // không có cũng không sao
                    sameSite: "strict", // ngăn chặn tấn công CSRF (sameSite nghĩa là các http request chỉ đến tử cái site này thôi )
                });

                const { password, accept_password, ...others } = user._doc;

                res.status(200).json({ ...others, accessToken });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [POST] /auth/refresh (làm mới lại accessToken khi mà nó đã hết hạn)
    requestRefreshToken: async (req, res) => {
        try {
            // take refresh token from user
            // req.cookies.refreshToken  (refreshToken là tên cookie)
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken)
                return res.status(401).json("You're not authenticated!");

            // nếu trong refreshTokens không bao gồm refreshToken hiện tại thì không đúng người
            if (!refreshTokens.includes(refreshToken)) {
                return res.status(403).json("Refresh token is not valid");
            }
            jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_KEY,
                (err, user) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // lọc lại refreshTokens bỏ đi những token đã cũ
                    refreshTokens.filter((token) => {
                        return token !== refreshToken;
                    });
                    // Nếu không lỗi thì tạo accessToken và refreshToken mới
                    const newAccessToken =
                        authController.generateAccessToken(user); //user do jwt payload qua
                    const newRefreshToken =
                        authController.generateRefreshToken(user);
                    // khi có refreshToken mới thì lưu lại vào cookie
                    res.cookie("refreshToken", newRefreshToken, {
                        httpOnly: true, // cookie này là httpOnly cookie
                        secure: false, // khi nào deploy thì set lại true
                        path: "/", // không có cũng không sao
                        sameSite: "strict", // ngăn chặn tấn công CSRF (sameSite nghĩa là các http request chỉ đến tử cái site này thôi )
                    });
                    refreshTokens.push(newRefreshToken);
                    res.status(200).json(newAccessToken);
                }
            );
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [POST] /user/logout
    logoutUser: async (req, res) => {
        try {
            // clear refreshToken trong cookie đi
            res.clearCookie("refreshToken");

            // Sau khi cookie trống thì filter refreshTokens[] cũng sẽ không thỏa điều kiện ở return nên refreshTokens[] sẽ trống luôn
            refreshTokens = refreshTokens.filter((token) => {
                return token !== req.cookies.refreshToken;
            });
            res.status(200).json("Logged out successfully!!");
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = authController;
