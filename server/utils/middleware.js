import jwt from "jsonwebtoken";

const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token not found." });
  }

  const result = verifyAccessToken(token);

  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  req.tokenInfo = result.data;
  next();
};

// further verification if the required user is an admin
// call this after verifyToken(...)
const verifyIfAdmin = (req, res, next) => {
  if (req.tokenInfo.userType != "admin") {
    return res
      .status(403)
      .json({ error: "You need admin privileges to access this content." });
  }
  next();
};

export { verifyToken, verifyIfAdmin };
