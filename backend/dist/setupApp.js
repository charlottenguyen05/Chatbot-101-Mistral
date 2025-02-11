import express from "express";
import { config } from "dotenv"; // Allow reading and access to variable inside the .env file
config();
const app = express();
app.use(express.json());
app.post('/hello', (req, res, next) => {
    res.send(req.body.name);
});
export default app;
//# sourceMappingURL=setupApp.js.map