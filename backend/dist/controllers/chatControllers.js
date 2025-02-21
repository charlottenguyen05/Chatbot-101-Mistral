import { Mistral } from "@mistralai/mistralai";
import User from "../models/User.js";
const initialMessage = [
    { role: "assistant", content: "Hi, how can I help you" }
];
export async function conversation(req, res, next) {
    const { prompt } = req.body; // Get new prompt of the user
    try {
        const user = await User.findById(res.locals.jwData.id);
        if (!user) {
            return res.status(401).json({ message: "Please login to continue" });
        }
        // Get all the chats (array of dictionary) and updated the chatHistory and the user.chats (add the new prompt)
        // Ex: chatHistory = [{role: 'user', content: 'What is the best French cheese?'}, {{role: 'user', content: 'Tell my the history of Vietnam'}}]
        const chatHistory = user.chats.map(({ role, content }) => ({ role, content }));
        if (chatHistory.length <= 1) {
            chatHistory.push(...initialMessage);
            user.chats.push(...initialMessage);
        }
        chatHistory.push({ role: "user", content: prompt });
        // Update the chats document with new question from user
        user.chats.push({ role: "user", content: prompt });
        // Get the response from Mistral AI
        const mistral = new Mistral({ apiKey: process.env.MISTRAL_SECRET ?? "" });
        const chatResponse = await mistral.chat.complete({
            model: "mistral-small-latest",
            messages: chatHistory
        });
        // Update the chats document with new reponse from Mistral and save all updates
        user.chats.push(chatResponse.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        return res.status(500).json({ error: "Something went wrong when receiving the response from Mistral" });
    }
}
export async function getAllChats(req, res, next) {
    try {
        const user = await User.findById(res.locals.jwData.id);
        if (!user) {
            return res.status(401).json({ message: "Please login to continue" });
        }
        // Get all the chats (array of dictionary) and updated the chatHistory and the user.chats (add the new prompt)
        // Ex: chatHistory = [{role: 'user', content: 'What is the best French cheese?'}, {{role: 'user', content: 'Tell my the history of Vietnam'}}]
        const chatHistory = user.chats.map(({ role, content }) => ({ role, content }));
        return res.status(200).json({ chats: chatHistory });
    }
    catch (error) {
        return res.status(500).json({ error: "Something went wrong when get all chats" });
    }
}
export async function deleteChats(req, res, next) {
    try {
        const user = await User.findById(res.locals.jwData.id);
        if (!user) {
            return res.status(401).json({ message: "Please login to continue" });
        }
        await User.updateMany({}, { $set: { chats: [] } });
        return res.status(200).json({ message: "OK, deleted all chats" });
    }
    catch (error) {
        return res.status(500).json({ error: "Something went wrong when deleting chats" });
    }
}
//# sourceMappingURL=chatControllers.js.map