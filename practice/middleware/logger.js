export function logger(req, res, next) {
    console.log(
        `[ Time : ${new Date().toLocaleString()} ] [ Method : ${
            req.method
        } ] [ Path : ${req.path} ]`
    );
    next();
}
