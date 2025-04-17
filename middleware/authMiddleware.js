const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (![1, 2].includes(decoded.rol)) {
            return res.status(403).json({ error: "Acceso denegado. Solo maestras o admins." });
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
};

const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.rol !== 2) {
            return res.status(403).json({ error: "Acceso denegado. Solo admins." });
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
};

const verifyLogin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = {verifyToken, verifyAdmin,verifyLogin};
