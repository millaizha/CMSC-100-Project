import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res
      .status(401)
      .send({ success: false, message: "No token provided." });

  const token = authHeader.split(" ")[1]; // Assuming "Bearer <token>"
  if (!token)
    return res
      .status(401)
      .send({ success: false, message: "No token provided." });

  jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
    if (error) {
      console.log(error);
      return res
        .status(401)
        .send({ success: false, message: "Failed to authenticate token." });
    }

    // If token is valid, save user ID to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};

export { verifyToken };
