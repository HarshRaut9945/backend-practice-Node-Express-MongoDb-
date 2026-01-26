const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

//Define the person schema

const personSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['cheif','waiter','manager'],
        required:true
    },
    mobile:{
         type:String,
        required:true
    },
     email:{
         type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
     salary:{
         type:Number,
        required:true
    },
    username:{
        required:true,
        type:String
    },
     password:{
        required:true,
        type:String
    }
});

personSchema.pre('save',async function(next) {
    const person=this;
    //Hash the password only if it has been modified 
    if(!person.isModiefied('password')) return next();

    try{
      //hash password generation
         const salt = await bcrypt.genSalt(10);
         
        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
         // Override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    }catch(err){
          return next(err);
    }
})
personSchema.methods.comparePassword=async function(candidatePassword){
    try{
     // use bcrypt to compare the provided password withe hash password
     const isMatch=await bcrypt.compare(candidatePassword,this.password);
    }catch(err){
        throw err;
    }
}
// create person model
const person=mongoose.model('person',personSchema);
module.exports=person;
