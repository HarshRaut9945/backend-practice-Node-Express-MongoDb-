import express from 'express';
const app = express();
import session from 'express-session';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';   
import User from  './models/user.model.js';

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/user-crud')
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

app.set("view engine", 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    
}))
 
 let checkLogin=(req,res,next)=>{
    if(req.session.user){
        next();
    }else{
        res.redirect("login")
    }
 }

// Home
app.get("/",checkLogin, (req, res) => {
  res.send(`<h1>Home Pages </h1>   <p>Hello, ${req.session.user || 'Guest'}</p>
    <a href="/logout">Logout</a>
    `);
});

    app.get("/profile",checkLogin, (req, res) => {
  res.send(`<h1>Profile Page</h1>   <p>Hello, ${req.session.user || 'Guest'}</p>`);
  <a href="/logout">Logout</a>
});

// Register GET
app.get("/register", (req, res) => {
  res.render("register", { error: null });
});

// Register POST
app.post("/register", async (req, res) => {
  try {
    const { username, userpassword } = req.body;

    const hashedPassword = await bcrypt.hash(userpassword, 10);

    await User.create({ username, userpassword: hashedPassword });

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.render("register", { error: "Something went wrong, try again!" });
  }
});

// Login GET
app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// Login POST
app.post("/login", async (req, res) => {
  try {
    const { username, userpassword } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.render("login", { error: "User not found!" });
    }

    const isMatch = await bcrypt.compare(userpassword, user.userpassword);

    if (!isMatch) {
      return res.render("login", { error: "Invalid password!" });
    }

      req.session.user=username
      
    res.redirect("/");
    // res.send(`<h1>Welcome ${username}, Login Successful ✅</h1>`);

  } catch (err) {
    console.log(err);
    res.render("login", { error: "Something went wrong, try again!" });
  }
});

     app.get("/logout",(req,res)=>{
        req.session.destroy(()=>{
            res.redirect("/login");
        })
     })

app.listen(3001, () => console.log("Server running at http://localhost:3001"));
