const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const usersRoutes = require("./users");
const locationRoutes = require("./location");

// Auth Routes "/api/auth"
router.use("/auth", authRoutes);

// Users Routes "/api/users"
router.use("/users", usersRoutes);

// Location Routes "/api/location"
router.use("/location", locationRoutes);

module.exports = router;
