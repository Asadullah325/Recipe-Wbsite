import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        token = token.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid or expired token" });
            }
            req.user = decoded;
            next();
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "Server Error" });
    }
};

export default authMiddleware;
