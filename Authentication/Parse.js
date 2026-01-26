import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();


app.use(cookieParser());


 app.get("/", (req, res) => {
    var home=`Home Page`

       const username=req.cookies.username;
     if(!username){
            res.send(` ${home} :  No cookie found`)
     }
     res.send(`  ${home} :  Cookie found ${username}`)
 })

 app.get("/set-cookie", (req, res) => {
   res.cookie('username','Harsh Raut',
        {
            maxAge:900000,
            httpOnly:true, //the cookie is only accesed by web server      
        }
    )
               res.send(`Cookie has been set`)
 })


 app.get("/get-cookie", (req, res) => {
     const username=req.cookies.username;
     if(!username){
            res.send("No cookie found")
     }
     res.send(`Cookie found ${username}`)
 })

 app.get("/delete-cookie", (req, res) => {
        res.clearCookie('username');
        res.send("Cookie has been deleted")
 })

app.listen(3002, () => console.log("Server running at http://localhost:3001"));
