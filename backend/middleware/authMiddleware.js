// const jwt = require('jsonwebtoken');

// exports.verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ msg: 'No token provided' });

//   const token = authHeader.split(' ')[1];
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = payload; // { user_id, role, iat, exp }
//     next();
//   } catch (err) {
//     return res.status(401).json({ msg: 'Invalid token' });
//   }
// };

// exports.isAdmin = (req, res, next) => {
//   if (req.user?.role === 'admin') return next();
//   return res.status(403).json({ msg: 'Admin access required' });
// };


import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET || "supersecretkey", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

