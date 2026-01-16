import { ApiError } from "./errors.js";

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            error: {
                code: err.code,
                message: err.message,
                details: err.details,
            },
        });
    }

    // logger.error(err);
    console.error(err.message);

    res.status(500).json({
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
        },
    });
};

export default errorHandler;
