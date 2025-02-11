import jwt from "jsonwebtoken"
import { NextFunction, Response, Request } from "express"

// Verify the JWT token
interface JwtPayload {
    id: string;
    email: string;
}

function createToken(id: string, email: string) {
    const payload = { id, email }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
    return token
}

// Function to create Token in server and then send it back to the frontend (client)
export function sendTokenInCookies(res: Response, id: string, email: string) {
    res.clearCookie("auth_token", {
        httpOnly: true,
        path: "/",  // COokie is available to all routes (all application)
        domain: "localhost",
        signed: true
    })

    const token = createToken(id, email)

    // One cookie named auth-token being sent and its value is the newly created token
    // Ex: auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNjgwMzEyMzQ1fQ.S5-WjI1Wf8kHlO7FqJ6w5-B65FggFvZ2I8K56YlkDQ8; Path=/; HttpOnly; Secure; Domain=localhost; Max-Age=604800; SameSite=Lax
    res.cookie("auth_token", token, {
        httpOnly: true,
        signed: true,
        path: "/",
        domain: "localhost",
        maxAge: 24 * 60 * 60 * 1000 * 7,  // 7 days expiration
    })
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    // Get the signed cookie name auth-token from the request
    const token = req.signedCookies?.["auth_token"]
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" })
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, decoded: JwtPayload | null) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
            }
            // Set the value of res.locals.jwData to the payload of token
            // res.locals use to store temporary data that within a request-response cycle 
            // dieu do co nghia la the value of res.locals only persist only for the duration of the request 
            // (nhung middleware va handlers dang sau verifyToken deu co the truy cap vao gia tri cua res.locals)
            res.locals.jwData = decoded;   
        });
        next()
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}