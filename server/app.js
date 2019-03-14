import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import passport from "passport";

//@router
import Article from "./router/article";
import User from "./router/user";
import Comment from "./router/comment";

//@app initializtion
const app=express();
//@dotenv configuration
dotenv.config();
//@morgan configuration
app.use(morgan("dev"));

//@body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//@router config
app.use("/api/v1/users",User);
app.use("/api/v1/articles",Article);
app.use("/api/v1/comment",Comment);

//@passport configuration
app.use(passport.initialize());
//@Error handling 404 Status
app.use((req,res,next)=>{
    const error=new Error("sorry the requested resource could not be found.");
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
     res.json({
        error:{
            message:error.message
        }
    })
    next();
});

export default app;




