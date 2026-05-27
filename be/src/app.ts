import express from "express";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import postRoute from "./routes/post.router";
import { verifyToken } from "./middelwares/auth.middleware";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
