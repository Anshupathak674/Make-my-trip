class AppError extends Error {
    constructor(message, statuscode){
        super(message);
        this.statuscode = statuscode;
        this.explanation = message;
        // you can also use error.stacktrace() 
    }
}

module.exports = AppError;