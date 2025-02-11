import { Router } from "express";
import chatbotRouter from "./chatbotRouter.js";
import userRouter from "./userRouter.js";
const appRouter = Router({ mergeParams: true });
appRouter.use('/chatbot', chatbotRouter);
appRouter.use('/users', userRouter);
export default appRouter;
//# sourceMappingURL=indexRouter.js.map