
import express from 'express';
import cors from 'cors';
import userRouter from "./http/routes/user-router";

const app = express();

// Apply application middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', userRouter);

app.listen(process.env.SERVER_PORT);
console.log(`Server listening on localhost:${process.env.SERVER_PORT}`);

