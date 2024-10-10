import mongoose from "mongoose";


export const connectDB = async()=>{
    try{
        const db = await mongoose.connect(process.env.MONDODB_URL)
        console.log(`Connected to MongoDB:${db.connection.host}`);

    }catch(e){
        console.error(`Error connecting to MongoDB: ${e.message}`);
        process.exit(1);
    }
}