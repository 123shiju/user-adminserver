import express from 'express'
import  dotenv from 'dotenv'
import userRoutes from './routes/userRoute.js'
import adminRoutes from "./routes/adminRoute.js";
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound,erroHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port=process.env.PORT || 5000;
import cors from 'cors'

connectDB();




const app=express()

const corsOptions = {
    origin: ["http://localhost:5000", "http://127.0.0.1:3000"],
    credentials: true,
  };
  
app.use(cors(corsOptions));
app.use(express.static("BackEnd/public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/users',userRoutes)
app.use("/api/admin", adminRoutes);

app.get('/',(req,res)=>res.send('server is ready'));




app.use(notFound);
app.use(erroHandler);

app.listen(port,()=>console.log(`server started on port  ${port}`))



