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
const testRouter = express.Router();

// console.log(typeof app); // function
// console.log(app instanceof Function); // true

// console.log(typeof app.use); // function
// console.log(typeof app.get); // function

// console.log(app); // [Function : app] {}
// console.log(usersRouter); // mini router
// console.log(app.router); // main router

app.get("/hello", (req, res, next) => res.send("hello from express"));
// app.use("/api", router);
app.use("/users", usersRouter); // here usersRouter is a middleware
app.use("/orders", ordersRouter);
app.use("/test", testRouter);

usersRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    res.send("User list " + id);
});

ordersRouter.get("/:id", (req, res, next) => {
    const { id } = req.params;
    res.send("order list " + id);
});

//Async waiting
ordersRouter.get("/active/:id", async (req, res, next) => {
    // does not block the event loop
    const p = await new Promise((resolve, reject) => {
        setTimeout(() => {
            // console.log("Promised resolve");
            reject(new Error("Sample promise reject test"));
        }, 10000);
    }); // await pause the function
    console.log("in router ", p);
    return res.send(p);
});

//Blocking waiting
ordersRouter.get("/test/block", async (req, res, next) => {
    // block event loop
    let x = new Date().getTime();
    let delay = x + 30000; // 30 sec delay
    while (new Date().getTime() < delay) {}

    console.log(x);
    return res.send(x);
});

// This route will be delayed if a blocking route is executing,
// because the event loop is blocked.
testRouter.get("/", (req, res) => {
    res.send("OK");
});

testRouter.get("/block", (req, res) => {
    // CPU blocking — freezes event loop
    const start = Date.now();

    while (Date.now() - start < 10000) {}

    res.send("Blocking route finished");
});

testRouter.get("/non-block", async (req, res) => {
    // Non-blocking — event loop is free
    await new Promise((resolve) => setTimeout(resolve, 5000));
    res.send("Non-blocking route finished");
});

app.use((err, req, res, next) => {
    console.log(err.message);
    res.send(err.message);
});
//node do this(creating a server)
http.createServer(app).listen(3001);
