const express=require('express');
const router=express.Router();
const User = require('./../models/user');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

// router.post('/signup', async (req, res) => {
//     try {
//         const data = req.body; // Assuming the request body contains the user data

//         // Create new User  document using the Mongoose model
//         const newUser = new User(data);
//         const response = await newUser.save();

//         console.log("Data saved successfully");
//         const payload={
//             id:response.id
//         }
//        const token=generateToken(payload);
//        console.log("TOken is:  ",token);
       

//         res.status(200).json({response:response,token:token});

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


router.post('/signup', async (req, res) => {
    try {
        const data = req.body;

        const newUser = new User(data);
        const response = await newUser.save();

        const payload = {
            id: response._id,
            role: response.role
        };

        const token = generateToken(payload);

        res.status(201).json({
            user: {
                id: response._id,
                name: response.name,
                role: response.role
            },
            token: token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message }); // show real error while debugging
    }
});


//Login Route

router.post('/login', async (req, res) => {
    try {

        // Extract aadharCardNumber and password from request body
        const { aadharCardNumber, password } = req.body;

        // Find the  user by adharcardNumber
        const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

        // If user does not exist or password does not match,return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate token
        const payload = {
            id: user._id
        };

        const token = generateToken(payload);

        res.json({ token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//profile route

// router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
//     try{
//         const userData=req.user;
//         const userId=userData.id;
//         const user=await Person.findById(userId);
//         res.status(500).json({error:'Internal Sever Data'});
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal Server Error'});
//     }
// })

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: "Current password incorrect" });
        }

        user.password = newPassword;
        await user.save(); // pre-save hook will hash

        res.status(200).json({ message: "Password updated successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});




module.exports=router;