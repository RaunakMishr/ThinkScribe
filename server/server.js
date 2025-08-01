import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';

const app = express();

await connectDB()

//middleware
app.use(cors())
app.use(express.json())//all request will be parsed using json method

//Routes
app.get('/',(req, res)=>res.send("API is Working"))

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('Server is running on port '+PORT)
})

export default app;