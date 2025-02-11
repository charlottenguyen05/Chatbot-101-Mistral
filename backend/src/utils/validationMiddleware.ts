import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator"

// Each body() returns a middleware function
// The array of middleware: execute each middleware in order before moving to the route handler
const userSignupValidator = [
    body('name').notEmpty().withMessage("Username is required"),
    body('email').trim().isEmail().withMessage("Invalid email address"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters")
];

const userLoginValidator = [
    body('email').trim().isEmail().withMessage("Invalid email address"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters")
];

// ------- VALIDATORS FOR CHATBOT ----------
const chatCompletionValidation = [
    body("prompt").notEmpty().withMessage("Message is required")
]

// A function that takes in an array of validation rules (validators) and return an async function that through all the validators
// passed in. This async function gonna return error if validation failed, else moved to the next route handler.
const checkValidation = (validators: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validator of validators) {
            const result = await validator.run(req)
            if (!result.isEmpty()) {
                break
            }
        }
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(422).json({errrors: errors.array()});
        }
        return next();
    }
}

export {userSignupValidator, userLoginValidator, checkValidation, chatCompletionValidation}
