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