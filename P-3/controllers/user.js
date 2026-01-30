import {User} from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const register=async(req,res)=>{
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
    
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    // 1️⃣ Check empty fields
    if (!email || !password) {
        return res.json({
            message: "All fields are required",
            success: false
        });
    }
    // 2️⃣ Find user first
    const user = await User.findOne({ email });
    // 3️⃣ Check if user exists
    if (!user) {
        return res.json({
            message: "User not exist",
            success: false
        });
    }  
    // 4️⃣ Compare password
    const validpass = await bcrypt.compare(password, user.password);

    if (!validpass) {
        return res.json({
            message: "Invalid Password",
            success: false
        });
    }
    const token=jwt.sign({userId:user._id},'!@#$%^()',{
        expiresIn:'1d'
    })
    // 5️⃣ Success response
    res.json({
        message: `Welcome ${user.name}`,
        token,
        success: true
    });
};
