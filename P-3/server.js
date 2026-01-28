import express from "express";
import "./db.js";        // just import it, no need to store in variable
import dotenv from "dotenv";
import bodyParser  from "body-parser";
import {User} from './models/user.js'
import bcrypt from 'bcrypt'
dotenv.config();

const app = express();
app.use(bodyParser.json())

//user routes
//@api dsc_user register
//@api method-post
//@api endpoint - /api/user/register

app.post('/api/user/register',async(req,res)=>{
    const {name,email,password}=req.body;
    if(name==""|| email==""|| password==""){
    return res.json({message:"All fields are required"});
    }
    let user=await User.findOne({email})
    if(user) 
    return res.json({message:"User Already Registered..! ",success:false})
   
    const hashpassword=await bcrypt.hash(password,10)
     user= await User.create({name,email,password:hashpassword})

  res.json({message: 'User Created Successfully', success:true,user});
    
})





const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
