import mongoose from "mongoose";
import { config } from "dotenv";
config();
const mongoURL = process.env.MONGODB_URL;
async function ConnectDB() {
    try {
        await mongoose.connect(mongoURL);
    }
    catch (err) {
        throw err;
    }
    // Catch err after inital connection
    mongoose.connection.on('error', err => {
        console.error('Database error:', err);
    });
}
async function DisconnectDB() {
    mongoose
        .disconnect()
        .catch(error => { throw error; });
}
export { ConnectDB, DisconnectDB };
//# sourceMappingURL=connection.js.map