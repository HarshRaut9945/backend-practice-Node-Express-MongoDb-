import express from 'express';
const app = express();
const router = express.Router();



app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get('/about', (req, res) => {
  res.send('<h1>About Page</h1>');
});

  app.use((req,res)=>{
    // res.render('404',{message:"Page Not Found"})
    res.status(404).send('<h1>404 - Page Not Found</h1>');
  })


app.use((err,req,res,next)=>{
    const d=new Date();
    // console.log(` Time : ${d.getDate()} / ${d.getMonth()}  Method: ${req.method}`);
    console.error(err.stack)
    res.status(500).send('Something broke!')
    next()
})


// app.use('/test', router);

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});