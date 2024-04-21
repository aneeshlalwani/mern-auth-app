import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connted to Database");
}).catch((error) => {
    console.log(error)});

const app = express();

app.listen(3000, () => {
    console.log("server listening on port 3000...");
})

// ROUTES
app.use('/api/user', userRoutes);
