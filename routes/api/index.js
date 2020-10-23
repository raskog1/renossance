const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const usersRoutes = require("./users");
const locationRoutes = require("./location");
const roomRoutes = require("./rooms");

// Auth Routes "/api/auth"
router.use("/auth", authRoutes);

// Users Routes "/api/users"
router.use("/users", usersRoutes);

// Location Routes "/api/location"
router.use("/location", locationRoutes);

// Room Routes "/api/rooms"
router.use("/rooms", roomRoutes);

module.exports = router;
