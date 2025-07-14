import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/auth.routes";
import orderRoutes from "./routes/order.routes";
import productRoutes from "./routes/product.routes";
import roleRoutes from "./routes/role.routes";
import connectDB from "./config/db";
import menuRoutes from "./routes/menu.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/app", routes);
app.use("/app", orderRoutes);
app.use("/app", productRoutes);
app.use("/app", roleRoutes);
app.use("/app", menuRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
