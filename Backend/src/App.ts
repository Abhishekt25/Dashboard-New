
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoutes from './Routes/authRoutes'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


// Allow cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

//  Use your router
app.use('/api/', AuthRoutes);

//server start
const startserver = async () =>{
    try{
        await app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
          });
    } catch (error){
        console.error('Unable to connect to the database:', error);
    }
}

startserver();