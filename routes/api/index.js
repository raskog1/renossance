const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const usersRoutes = require("./users");

// Auth Routes "/api/auth"
router.use("/auth", authRoutes);

// Users Routes "/api/users"
router.use("/users", usersRoutes);

module.exports = router;
