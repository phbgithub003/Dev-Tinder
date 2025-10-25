const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const userRouter = require("./routes/user")

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestsRouter);
app.use("/",userRouter);


connectDB()
    .then(() => {
        console.log("DB connected successfully");
        app.listen(3000, () => {
            console.log("server is running on port 3000");
        });
    })
    .catch((err) => {
        console.log("DB connection failed");
        console.log(err);
    });
