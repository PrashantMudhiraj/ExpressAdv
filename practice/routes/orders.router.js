import express from "express";
import { ValidationError } from "../middleware/errors.js";
const ordersRouter = express.Router();

ordersRouter.get("/throwError", (req, res) => {
    // throw new ValidationError({
    //     quantity: "Must be greater than 0",
    //     price: "Must be a number",
    //     customerId: "Required",
    // });
    throw new Error("internal error");
});

ordersRouter.get("/:id", (req, res, next) => {
    console.log("orderRouter req.url " + req.url); // /1
    console.log("orderRouter req.BaseUrl " + req.baseUrl); // /api/orders
    console.log("orderRouter req.originalUrl " + req.originalUrl); // /api/orders/1
    res.send(" request processed for order id : " + req.params.id);
});

ordersRouter.get("/", (req, res, next) => {
    res.send("all orders");
});

export default ordersRouter;
