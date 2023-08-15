const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
  const token = (req.headers?.authorization || "").replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    var decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Failed to authenticate token." });
  }
};

module.exports = { AuthMiddleware };
