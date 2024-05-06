import express from "express";
import orderRoutes from './routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/menu", orderRoutes);

export default app