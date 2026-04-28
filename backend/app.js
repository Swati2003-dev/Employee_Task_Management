import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from './routes/user.routes.js'

const app = express()


app.use(cors())
app.use(express.json())

app.use("/api/auth/", authRoutes)
app.use("/api/users/", userRoutes)


app.get("/", (req, res) =>{
    res.send("hiiiii")
})


// Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 Global Error Handler:", err.stack);
    res.status(500).json({
        message: "An internal server error occurred",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
});

export default app;