import express from "express";
import "./db.js";        // just import it, no need to store in variable
import dotenv from "dotenv";
import bodyParser  from "body-parser";
import userRouter from './Routes/user.js'
import contactRouter from './Routes/contact.js'
dotenv.config();

const app = express();
app.use(bodyParser.json())



app.use('/api/user',userRouter)
app.use('/api/contact',contactRouter )





const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
