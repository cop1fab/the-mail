import express from "express";
import passport from "passport";
//@router initialization
const router=express.Router();
//@controller
import User from "../controllers/user";

//@POST
//@ desc this allows user to signup
router.post("/signup",User.create);
//@POST
//@desc this allows user to signin
router.post("/signin",User.signin);

//@test
router.get("/test",passport.authenticate("jwt",{session:false}),(req,res)=>{
return res.json("ok man");
})
export default router;