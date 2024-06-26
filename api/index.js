import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connted to Database");
}).catch((error) => {
    console.log(error)});

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("server listening on port 3000...");
})

// ROUTES
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// MIDDLE WARES
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
});