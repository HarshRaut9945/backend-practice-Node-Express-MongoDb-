import jwt from 'jsonwebtoken'
import {User} from '../models/user.js'
const { verify } = jwt;

export const isAuthenticated =async(req,res,next)=>{
    const token=req.header('Auth')
    if(!token) return res.json({message:"Login First "})
  
    const decode=jwt.verify(token,'!@#$%^()');
    const id=decode.userId;

    let user=await User.findById(id);

    if(!user) return res.json({message:'User Not Found'})

        req.user=user;
        next();

}