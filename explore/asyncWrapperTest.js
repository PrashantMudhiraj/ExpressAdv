// required for express 4 and less version
// In Express 5 automatically handled

function asyncWrapperHandler(fn) {
    return function (req, res, next) {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
}
