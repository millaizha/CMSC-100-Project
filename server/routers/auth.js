import { register, getRegisteredUsers, login } from "../controllers/auth.js";

const authRoutes = (app) => {
  app.post("/register", register);
  app.get("/register", getRegisteredUsers);
  app.post("/login", login);
};

export default authRoutes;
