// middlewares/validateBooking.js
// const { body, validationResult } = require('express-validator');
const {StatusCodes} = require('http-status-codes')
const {ErrorResponse} = require('../utils/common')
// exports.validateBooking = [
//     body('modelNumber').notEmpty().withMessage('Model Number is required'),
//     body('capacity').isInt({ gt: 0 }).withMessage('Capacity must be > 0'),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty())
//             return res.status(400).json({ errors: errors.array() });
//         next();
//     }
// ];
function validateAirplaneCreate(req, res, next) {
    if(!req.body.modelNumber){
        ErrorResponse.message = 'Something went wrong while creating the plane';
        ErrorResponse.error = {explanation: 'Model Number not found in the incoming request'} 
        return res.status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }
    if(!req.body.capacity){
        ErrorResponse.message = 'Something went wrong while creating the plane';
        ErrorResponse.error = {explanation: 'Capacity not found in the incoming request'} 
        return res.status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }
    next();
}

module.exports = {
    validateAirplaneCreate
}