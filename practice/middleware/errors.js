// interface Error {
//     name: string;
//     message: string;
//     stack?: string;
// }

export class ApiError extends Error {
    constructor({ code, message, status, name, details = {} }) {
        super(message);
        this.code = code;
        this.status = status;
        this.details = details;
        this.name = name;
    }
}

export class NotFoundError extends ApiError {
    constructor(code, message = "Resource not found") {
        super({
            code,
            message,
            status: 404,
            name: "NotFoundError",
        });
    }
}

export class ValidationError extends ApiError {
    constructor(fieldErrors) {
        super({
            code: "VALIDATION_ERROR",
            message: "Request validation Failed",
            status: 404,
            name: "NotFoundError",
            details: { fields: fieldErrors },
        });
    }
}

const error = new NotFoundError("ORDER_NOT_FOUND", "order not found");
const validationError = new ValidationError({
    quantity: "Must be greater than 0",
    price: "Must be a number",
    customerId: "Required",
});

// console.log(error.code); //ORDER_NOT_FOUND
// console.log(error.message); //order not found
// console.log(error.status); //404
// console.log(error.name); //NotFoundError

// console.log(validationError.code); //ORDER_NOT_FOUND
// console.log(validationError.message); //order not found
// console.log(validationError.status); //404
// console.log(validationError.name); //NotFoundError
// console.log(validationError.details);

//Usage
