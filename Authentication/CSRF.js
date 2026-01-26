import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
app.set("view engine", 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());

app.use(cookieParser());
const csrfProtection = csrf({ cookie: true }); 

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.get('/myform', csrfProtection, (req, res) => {
    res.render('csrf',{ csrfToken: req.csrfToken() });
});
app.post('/submit', csrfProtection, (req, res) => {
    res.send(req.body);
});

   

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});