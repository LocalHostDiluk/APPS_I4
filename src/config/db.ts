import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const mongoUri = "mongodb://127.0.0.1:27017/p1";
  try {
    await mongoose.connect(mongoUri);
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("Conexion a MongoDB falló:", error);
  }
};

export default connectDB;