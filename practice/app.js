import express from "express";
import { logger } from "./middleware/logger.js";
import apiRouter from "./routes/apiRouter.js";

// import usersRouter from "./routes/users.router.js";
// import ordersRouter from "./routes/orders.router.js";

const app = express();

app.use(logger); //middleware
app.use("/api", apiRouter);

// app.use("/users", usersRouter);
// app.use("/orders", ordersRouter);

app.get("/getTest/:id", (req, res, next) => {
    res.send("hello !");
});

app.use("/test", (req, res, next) => {
    res.write("Hello "); // request still alive
    res.write("World!");
    res.end();
});

// console.log(app.router.handle);
// app.use((req, res) => res.send("none route"));
// console.log(app.router);
// console.log(app.router.stack[0]); //logger
// console.log(app.router.stack[1]); // "/api" router
// console.log(app.router.stack[4]); // "/api" router

app.listen(3000, () => {
    console.log("app listening on port 3000");
});
