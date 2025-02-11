import User from "../models/User.js";
import { hash, compare } from 'bcrypt';
import { sendTokenInCookies } from "../utils/token.js";
async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();
        return res.status(200).json({ users });
    }
    catch (error) {
        return res.status(500).json({ message: "Error", cause: error });
    }
}
async function signup(req, res, next) {
    try {
        const { name, email, password } = req.body;
        const hashedPwd = (await hash(password, 10)).toString();
        const user = new User({
            name, email, password: hashedPwd
        });
        await user.save();
        sendTokenInCookies(res, user._id.toString(), user.email);
        return res.status(200).json({ message: "New user created", name: user.name, email: user.email });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Can not create new user", cause: error });
    }
}
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not registred" });
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "Incorrect password" });
        }
        sendTokenInCookies(res, user._id.toString(), user.email);
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        return res.status(500).json({ message: "Error", cause: error.message });
    }
}
async function persistLogin(req, res, next) {
    try {
        const user = await User.findById(res.locals.jwData.id);
        if (!user) {
            return res.status(401).json({ message: "User not found or Token incorrect" });
        }
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        return res.status(500).json({ message: "Error", cause: error.message });
    }
}
async function logout(req, res, next) {
    try {
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        return res.status(200).json({ message: "Logout succesfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Error", cause: error.message });
    }
}
export { getAllUsers, signup, login, persistLogin, logout };
//# sourceMappingURL=userControllers.js.map