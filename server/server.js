import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/authRoutes.js'

dotenv.config();


// Setting the app
const app = express();

app.use(bodyParser.json());
app.use(cors()); // For cross browser interraction
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use(express.json()); // Able to pass json


// Routes
app.use('/api', router); // hitting all routes from here


const PORT = process.env.PORT;


// Setting the database

mongoose.connect('mongodb://127.0.0.1:27017/farmerSalesAppDB')
 .then(()=> {
    console.log("connected to the database Successfully!")
 })
 .catch((err)=> {
    console.log("Cannot connect to the database: " + err);
 });


 







app.listen(PORT, (req, res) => {
    console.log(`You're now connected to the server at Port localhost:${PORT}`);
})