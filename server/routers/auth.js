import express from "express";
import { register, getRegisteredUsers, login } from "../controllers/auth.js";

const authRoutes = express.Router();

/**
 * POST /auth/register
 * Register one user.
 *
 * Inputs for req.body:
 * firstName - String
 * middleName - String (optional)
 * lastName - String
 * userType - String ("admin" or "registered")
 * email - String (unique)
 * password - String
 *
 * Response:
 * If successful: Status code 201; "User created successfully"
 * Else: Status code 500; "Error signing up"
 */
authRoutes.post("/register", register);

/**
 * GET /auth/register
 * Get all registered users (including the admin)
 *
 * Inputs for req.body:
 * None
 *
 * Returns:
 * If successful: Status code 200; <list of users>
 * Else: Status code 500; "Unable to get users"
 */
authRoutes.get("/register", getRegisteredUsers);

/**
 * POST /auth/login
 * Login a user
 *
 * Inputs for req.body:
 * email - String
 * password - String
 *
 * Returns:
 * If successful: Status code 200; "Login successful"
 * If non-existent user or wrong password: Status code 401; "Invalid credentials"
 * Else: Status code 500; "Error signing up"
 */
authRoutes.post("/login", login);

export default authRoutes;
