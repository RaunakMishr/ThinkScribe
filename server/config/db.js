// import mongoose from "mongoose";

// const connectDB = async()=>{
//     try{
//         mongoose.connection.on('connected',()=> console.log("Database Connected"))
//         await mongoose.connect(process.env.MONGODB_URI,{
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     }catch(error){
//         console.log(error.message);
//     }
// }
// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log(" MongoDB Connected")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}`); // Clean
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
  }
};

export default connectDB;
