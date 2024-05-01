import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// SIGN UP CONTROLLER
export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try{
    await newUser.save();
    res.status(201).json({"message": "User created successfully."});
    }catch(error){
    next(error); 
    }
}

// SIGN IN CONTROLLER
export const signin = async (req, res, next) => {
    const {email, password} = req.body; 
    try{
    const validUser = await User.findOne({email});
    // validating user email
    if(!validUser) return next(errorHandler(404, 'User Not Found!'));
    const validPassword = bcryptjs.compareSync(password,validUser.password);
    // validating user password
    if(!validPassword) return next(errorHandler(401, 'Wrong password! '));
    // generated a token  
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
    // removing password from response
    const {password: hashedPassword, ...rest} = validUser._doc;
    
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour -> cookie expiry time/date
    res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).json(rest);
    }catch(error){
    next(error);
    }
}

// AUTH CONTROLLER FOR GOOGLE OAUTH
export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password: hashedPassword, ...rest} = user._doc;
            const expiryDate = new Date(Date.now() + 3600000) // 1 hour
            res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json(rest);
        } else {
            const generatedPass = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPass, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
            })
            await newUser.save()
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password: hashedPassword2, ...rest} = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000) // 1 hour
            res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}