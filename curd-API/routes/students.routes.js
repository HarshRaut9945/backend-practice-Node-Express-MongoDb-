const express = require('express');

const router = express.Router();
const Student=require('../models/students.model');
const multer=require('multer')
const path=require('path')
const fs=require('fs');
const { log } = require('console');

   const storage=multer.diskStorage({
      destination:(req,file,cb)=>{
             cb(null,'./uploads')
      },
      filename:(req,file,cb)=>{
          const newFileName=Date.now() + path.extname(file.originalname)
          cb(null,newFileName)
      }
   })
   
  const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null,true)
    }else{
        cb(new Error('only images are allowed'),false)
    }
  }

  const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits :{
        fileSize: 1024 * 1024 * 3
    }
  })


//Get all students
router.get('/', async (req, res) => {

    try{
            const students=await Student.find()
            res.json(students)
    }catch(err){
        res.status(500).json({message: err.message});
    }
})


//Get a single student
router.get('/:id', async (req, res) => {

    try{
             
        const student=await Student.findById(req.params.id)

        if(!student) return  res.status(404).json({message: 'STudent Not Found '});
            res.json(student)
    }catch(err){
        res.status(400).json({message: err.message});
    }
})


//add a new student 

router.post('/', upload.single('profile_pic') ,async (req, res) => {

    try{
            //const newStudent=await Student.create(req.body)
    const student = new Student(req.body)
    if(req.file){
        student.profile_pic=req.file.filename
    }
    const newStudent=await student.save()
            res.status(201).json(newStudent)
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

//update a  student
router.put('/:id',upload.single('profile_pic'), async (req, res) => {

    try{

        const existingStudent=await Student.findById(req.params.id)
        if(!existingStudent) {
             if(req.file.fieldname){
       const filePath=path.join('./uploads',req.file.fieldname)
            fs.unlink(filePath,(err)=>{
              if(err)  console.log("Failed To Delete old image",err)
            })
             }
            return res.send(404).json({message:'student not found'})
        }

       if(req.file){
        if(existingStudent.profile_pic){
            const oldimagePath=path.join('./uploads',existingStudent.profile_pic)
            fs.unlink(oldimagePath,(err)=>{
              if(err)  console.log("Failed To Delete old image",err)
            })
        }
        req.body.profile_pic=req.file.fieldname
       }


       const updateStudent=await Student.findByIdAndUpdate(req.params.id,req.body,

        {new:true}
       ) 
       res.json(updateStudent)

    }catch(err){
        res.status(500).json({message: err.message});
    }
})

//delete a student
router.delete('/:id', async (req, res) => {

    try{
         const student=await Student.findByIdAndDelete(req.params.id)

           if(! student) return  res.status(404).json({message: 'STudent Not Found '});
           if(student.profile_pic){
            const filePath=path.join('./uploads',student.profile_pic)
            fs.unlink(filePath,(err)=>{
                console.log("Failed To Delete",err)
            })
           }
           res.json({message:'Student Deleted '})

    }catch(err){
        res.status(500).json({message: err.message});
    }
})


module.exports=router