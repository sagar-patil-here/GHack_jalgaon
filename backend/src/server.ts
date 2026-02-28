import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";

dotenv.config();
connectDB();  

const PORT = process.env.PORT || 5001;
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
