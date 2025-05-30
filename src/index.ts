import express from "express";
import morgan from "morgan";
import routes from "./routes/auth.routes";
import connectDB from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use("/app", routes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
