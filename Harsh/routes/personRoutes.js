const express=require('express');
const router=express.Router();
const Person = require('./../models/person');
const {jwtAuthMiddleware,generateToken}=require('./../Jwt');

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;

        // Create new person document
        const newPerson = new Person(data);
        const response = await newPerson.save();

        console.log("Data saved successfully");
        const payload={
            id:response.id,
            username:response.username

        }
       const token=generateToken(payload);
       console.log("TOken is:  ",token);
       

        res.status(200).json({response:response,token:token});

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/',async(req,res)=>{
    try{
     const data=await Person.find();
     console.log('data fetched');
     res.status(200).json(data);
     
    }catch(err){
 console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;

        if (workType === 'chef' || workType === 'waiter' || workType === 'manager') {
            
            const response = await Person.find({ work: workType });

            console.log('Response fetched');
            return res.status(200).json(response);
        } 
        else {
            return res.status(400).json({ 
                error: 'Invalid work type' 
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ 
            error: 'Internal Server Error' 
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(
            personId,
            updatePersonData,
            {
                new: true,            // return updated document
                runValidators: true   // run schema validation
            }
        );

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data updated');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const personalId=req.params.id; // extract the person id  from the url

        //Asuming you have a person model
        const response=await Person.findByIdAndRemove(personalId);

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
         console.log('Data updated');
        res.status(200).json({message:'person Deleted Sucessfully'});

    }catch(err){
          console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
     }
})

module.exports=router;