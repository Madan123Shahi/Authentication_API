const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  // const token = req.headers.authorization.split(" ")[1];
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return next(new Error("No token Exists"));
  }
  console.log(process.env.JWT_SECRET);
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    console.log(decoded.id);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return next(new Error("Invalid Token or expired token"));
  }
};

module.exports = isAuthenticated;
