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

app.use((req, res, next) => {
    res.send("hello !");
});
app.listen(3000, () => {
    console.log("app listening on port 3000");
});
