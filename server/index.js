// server/index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRout.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notes', noteRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running on http://localhost:5000")))
  .catch((err) => console.log(err));
