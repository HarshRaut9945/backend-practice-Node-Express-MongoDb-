const jwt=require('jsonwebtoken');
const jwtAuthMiddleware = (req, res, next) => {

    // Check if authorization header exists
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request
        req.user = decoded;

        next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Function to generate JWT token

const generateToken=(userData)=>{
    //Generate a new jwt  token using user data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:3000})
}

module.exports={jwtAuthMiddleware,generateToken}