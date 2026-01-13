import express from "express";
import usersRouter from "./users.router.js";
import ordersRouter from "./orders.router.js";

const router = express.Router();
router.use("/users", usersRouter);
router.use("/orders", ordersRouter);

export default router;
