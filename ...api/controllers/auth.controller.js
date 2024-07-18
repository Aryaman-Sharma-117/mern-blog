import User from '../models/user.modal.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';

export const signup = async (req,res,next)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password || username==='' || email==='' || password===''){
        next(errorHandler(400,'All fields are required'))
    }
    const hash = bcryptjs.hashSync(password,10);
    const newUser = new User({
        username,
        email,
        password:hash,
    })
    try{
        await newUser.save();
    } catch(err){
        next(err);
    }
    
}