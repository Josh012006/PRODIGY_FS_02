import mongoose from "mongoose";


let isConnected = false;

const connectDB = async () => {

    mongoose.set('strictQuery', true); // Permet de s'assurer que les requêtes respectent le format des models.

    if(!process.env.MONGO_URI) return console.log('MONGO_URI required');
    if(isConnected) return console.log("Already connected!");

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!);

        isConnected =true;

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error while connecting database " + error);
    }
};


export default connectDB;