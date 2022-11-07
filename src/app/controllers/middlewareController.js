const jwt = require("jsonwebtoken");

const middlewareController = {
    // vertify token (xác thực token này có đúng user đó không)
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        // Kiểm tra token có đúng không
        if (token) {
            // token: Bearer AHBbysdewYsdb
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                // user là do jwt.sign payload qua
                if (err) {
                    res.status(403).json("Token is not valid");
                    return;
                }
                req.user = user;
                next();
            });
        } else {
            // Ngược lại không có token thì
            res.status(401).json("You're not authenticated");
        }
    },

    // (xác thực token này và xem user này có phải là admin hay không)
    // Dùng middleware này để phân quyền
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.admin) {
                next();
            } else {
                res.status(403).json("You're not allowed to delete other");
            }
        });
    },
};

module.exports = middlewareController;
