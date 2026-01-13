import express from "express";

const usersRouter = express.Router();

usersRouter.get("/:id", (req, res, next) => {
    res.send(" request processed for user id : " + req.params.id);
});

usersRouter.get("/", (req, res, next) => {
    res.send("all users");
});
// console.log("user router ---> ", usersRouter);
// console.log("user Layer ---> ", usersRouter.stack[0].route);
export default usersRouter;
