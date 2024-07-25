import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import User from '../models/user.modal.js';

export const test = (req,res)=>{
    res.json({message:'api is working'})
};

export const updateUser = async (req,res,next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allowed to update the user'))
    }
    if(req.body.password){
        if(req.body.password.length<6){
            return next(errorHandler(400,'Password must be 6 characters or longer'))
        }
        req.body.password=bcryptjs.hashSync(req.body.password,10)
    }
    if(req.body.username){
        if(req.body.username.length<3){
            return next(errorHandler(400,'Username must be 3 characters or longer'))
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400,'Username must not include spaces'))
        }
    }
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilePicture:req.body.profilePicture,
            }
        },{new:true})
        const {password,...rest} = updateUser._doc
        res.status(200).json(rest)
    } catch(err){
        next(err)
    }
}