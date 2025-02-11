import { ConnectDB } from "./db/connection.js";
import app from "./app.js";
const port = process.env.PORT || 3000;
ConnectDB()
    .then(() => app.listen(port, () => {
    console.log(`App listening on port ${port} and database connected`);
}))
    .catch(err => { throw err; });
//# sourceMappingURL=index.js.map