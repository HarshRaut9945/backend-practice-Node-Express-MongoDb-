import express from "express";
import "./db.js";        // just import it, no need to store in variable
import dotenv from "dotenv";

dotenv.config();

const app = express();

//user routes
//@api dsc_user register
//@api method-post
//@api endpoint - /api/user/register

app.post('/api/user/register',(req,res)=>{
    const {name,email,password}=req.body;
})





const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
