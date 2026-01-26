import express from 'express';


const app = express();
app.set("view engine", 'ejs');

import session from 'express-session';
import MongoStore from 'connect-mongo';




 
app.use(session({
    secret: 'secretpassword',
     resave: false ,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/sessiondb',
         collectionName: 'mysessions'
      }),
       cookie: { maxAge: 1000 * 60 * 60 *24}

}))


app.get('/',(req,res)=>{
   if(req.session.username){
        res.send(`<h1>Username stored in session is : ${req.session.username} </h1>`)
    }else{
         res.send('<h1>No username found in session</h1>')
    }
})
app.get('/set-username',(req,res)=>{
    req.session.username='HARSH-RAUT'
    res.send('<h1>Username HAs been set in session </h1>')
})

app.get('/get-username',(req,res)=>{
  
    if(req.session.username){
        res.send(`<h1>Username stored in session is : ${req.session.username} </h1>`)
    }else{
         res.send('<h1>No username found in session</h1>')
    }

})

   app.get('/destroy-session',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.status(500).send('failed to destroy session')
        }else{
            res.send('<h1>Session destroyed successfully</h1>')
        }
    })
   })


 app.listen(3000,()=>{
    console.log('Server is running on port 3000')
 })