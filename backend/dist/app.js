import express from "express";
import morgan from "morgan";
import appRouter from "./routes/indexRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
config();
const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
    origin: process.env.FRONTEND_BASEURL,
    credentials: true,
}));
// Remove morgan in production email
app.use(morgan("dev"));
app.use("/api", appRouter);
export default app;
//# sourceMappingURL=app.js.map