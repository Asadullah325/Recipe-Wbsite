import express from "express";
import recRoutes from "./routes/recipe.router.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./database/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/recipes", recRoutes);
app.use("/api/user", userRoutes)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
