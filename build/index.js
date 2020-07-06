"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const express_1 = __importDefault(require("express"));
// @ts-ignore
const cors_1 = __importDefault(require("cors"));
// @ts-ignore
const dotenv_1 = __importDefault(require("dotenv"));
// @ts-ignore
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routes/user-router"));
// configure environment variables
dotenv_1.default.config();
const app = express_1.default();
// Apply application middleware
app.use(cors_1.default());
app.use(express_1.default.json());
// connect to mongodb
mongoose_1.default.connect(process.env.MONGODB_UR, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("Mongodb connection complete");
    }
    else {
        console.log("Mongodb error");
    }
});
app.use('/api/v1/auth', user_router_1.default);
app.listen(process.env.SERVER_PORT);
console.log(`Server listening on localhost:${process.env.SERVER_PORT}`);
