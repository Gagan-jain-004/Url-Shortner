import express from "express";

import mongoose from "mongoose";
import cors from "cors";
import {nanoid} from "nanoid";
import dotenv from "dotenv";
import QRCode from "qrcode"; // Import QRCode module
dotenv.config(); // Load environment variables
console.log("DATABASE_URL:", process.env.DATABASE_URL); // Log DATABASE_URL for verification

console.log("DATABASE_URL:", process.env.DATABASE_URL); // Log DATABASE_URL for verification



const app= express();
app.use(cors())
app.use(express.json());

//connection to database 
mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));


const urlSchema = new mongoose.Schema({
        originalUrl: String,
        shortUrl: String,
        clicks:  {type: Number, default: 0},
})

const Url = mongoose.model('Url',urlSchema)

app.get("/",(req,res)=>{
    res.json({Message:"Response is sended by backend"});
})

app.post('/api/short',async(req,res)=>{
    try{
        const {originalUrl} = req.body;
        if(!originalUrl)  return res.status(400).json({error: "original url required"})
        const shortUrl = nanoid(8)
        const url = new Url({originalUrl,shortUrl})
        const myUrl = `http://localhost:3000/${shortUrl}`
        const qrCodeImg = await QRCode.toDataURL(myUrl)
        await url.save();
      return  res.status(200).json({message: "URL Generated",shortUrl: myUrl,qrCodeImg})
    
    }catch(error){
console.log(error)
res.status(500).json({error: 'Server error'});
    }
})

app.get('/:shortUrl',async(req,res)=>{
    try{
        const {shortUrl} = req.params;
        const url = await Url.findOne({shortUrl});
        if(url){
            url.clicks++;
            await url.save();
            return res.redirect(url.originalUrl);
        }else{
            res.status(404).json({error: 'URL not found'});

        }
        
        }
        catch(error){
                console.log(error)
                res.status(500).json({error: 'Server error'});
        }
       } )

app.listen(3000,()=> console.log("server is running on 3000"));
