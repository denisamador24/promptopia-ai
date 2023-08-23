import mongoose from "mongoose";

let isConnected = false;

export const connectedToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('mongoDB is already conneted')
  } 

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUriParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;
    console.log('MongoDB conneted');
  } catch (error) {
    console.log(error);
  }
}

