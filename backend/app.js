import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"})) //accept data in json format with specified limit

app.use(express.urlencoded({extended:true,limit:"16kb"})) //to handle data that comes from urls and forms

app.use(express.static("public")) //all static files are in public folder

app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Hello");
})

//routes declaration
app.use("/api/v1/users",userRouter)

export default app;