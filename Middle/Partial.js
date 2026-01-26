import { error } from 'console';
import express from 'express';

import multer from 'multer';
import path from 'path';
const app = express();

app.set("view engine", 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
          cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        const newFileName=Date.now() + path.extname(file.originalname)
        cb(null,newFileName)
    }
})

//file.mimetype.startsWith('image/')
const fileFilter=(req,file,cb)=>{
              if(file.mimetype=='image/jpeg' || file.mimetype==='image/png'){
                  cb(null,true)
              }else{
                  cb(new Error('only images are allowed '),false)
              }
}

     const upload= multer({  
        storage:storage,
        limits:{
            fileSize:1024 * 1024 * 3
        },
        fileFilter:fileFilter
     })

app.get('/', (req, res) => {
  res.render('Par');
});

app.post('/submitform',upload.single('userfile'),(req,res)=>{

     if(!req.files || req.files.length===0){
        return res.status(400).send('No file uploaded')
     }

    res.send(req.file.filename)
},)

app.use((error,req,res,next)=>{
    if(error instanceof multer.MulterError){
        
        return res.status(400).send(`Multer error : ${error.message}`)
    }else if(error){
  return res.status(500).send(`Something Wenrt Wrong : ${error.message}`)
    }
    next()
})



app.listen(3003, () => {
  console.log('Server is running on port 3003');
});
