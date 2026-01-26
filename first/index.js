import express from "express";
const app=express()

app.set("view engine", 'ejs')

app.use(express.urlencoded({extended:false}))
  
app.listen(3001,()=>{
    console.log("Sucess fully connected on port 3000");
    
})

 app.get('/',(req,res)=>{
       res.send("<h1>Welcome to home page</h1>")
 })


 app.get('/about',(req,res)=>{
    let items=['Apple','Banana','xherry']
    res.render('about',{title:'About PAge',message:"Welcome"
        , items
    })
 })

    app.get('/form',(req,res)=>{
    res.render('form',{message:null})
        })      
       
 app.post('/submit',(req,res)=>{
    const name=req.body.myname

    const message=`Hello ${name} You  SUmbitted The Form `
     res.render('form',{message:null}) 
 })
 