import http from "http";
import express from "express";

//express do this (handles request response)
// req -> IncomingMessage
// res -> serverResponse
// node call this function on every request
// function app(req, res, next) {
//     console.log(req.url);
//     res.end("hello from custom app");
// }

const app = express(); // app is a function
const usersRouter = express.Router();
const ordersRouter = express.Router();

console.log(typeof app); // function
console.log(app instanceof Function); // true

console.log(typeof app.use); // function
console.log(typeof app.get); // function

console.log(app); // [Function : app] {}
console.log(usersRouter); // mini router
console.log(app.router); // main router

app.get("/hello", (req, res, next) => res.send("hello from express"));
// app.use("/api", router);
app.use("/users", usersRouter); // here usersRouter is a middleware
app.use("/orders", ordersRouter);

usersRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    res.send("User list " + id);
});

ordersRouter.get("/:id", (req, res, next) => {
    const { id } = req.params;
    res.send("order list " + id);
});

//node do this(creating a server)
http.createServer(app).listen(3000);
