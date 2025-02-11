import { Router } from "express";
import { verifyToken } from "../utils/token.js";
import { conversation, deleteChats, getAllChats } from "../controllers/chatControllers.js";
import { chatCompletionValidation, checkValidation } from "../utils/validationMiddleware.js";
const chatbotRouter = Router({ mergeParams: true });
// Protected API
chatbotRouter.route('/new')
    .post(verifyToken, checkValidation(chatCompletionValidation), conversation);
chatbotRouter.route('/all-chats')
    .get(verifyToken, getAllChats);
chatbotRouter.route('/delete')
    .delete(verifyToken, deleteChats);
export default chatbotRouter;
//# sourceMappingURL=chatbotRouter.js.map