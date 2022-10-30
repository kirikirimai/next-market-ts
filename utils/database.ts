import mongoose, { mongo } from "mongoose";

const connectDB =async ()=>{
    try {
        
        await mongoose.connect("mongodb+srv://kiriyama:hiro0812@cluster0.xx0fv0w.mongodb.net/next-market-ts?retryWrites=true&w=majority")
        console.log("success mongodb")
        
    } catch (error) {
        console.log("failre  unconnected to mongoDB")
        throw new Error()
    }
}

export default connectDB