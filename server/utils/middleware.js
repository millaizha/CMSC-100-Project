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
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401).json({ error: "Token not found." });
  }

  const result = verifyAccessToken(token);

  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  req.tokenInfo = result.data;
  next();
};

export { verifyToken };
