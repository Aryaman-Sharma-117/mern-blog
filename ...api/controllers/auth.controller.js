import User from '../models/user.modal.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password || username==='' || email==='' || password===''){
        return res.status(400).json({message:'error'});
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
        res.status(500).json({message:err.message});
    }
    
}