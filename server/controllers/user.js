import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
//@model
import models from "../models/index";
const User=models.user;
class UserController{
   /**
   *@User Methods must be here
   */
  create(req,res){
   //@assigning user
   const newUser={
      name:req.body.name,
      email:req.body.email,
      password:bcrypt.hashSync(req.body.password),
      isadmin:req.body.isadmin? req.body.isadmin: false
   };
   //@check if email is exist
   User.findOne({where:{email:newUser.email}})
   .then(email=>{
       if(email){
           return res.status(400).json({error:"email already exist"});
       }
       //@create user
       User.create(newUser)
         .then(user=>{
            return res.status(201).json({status:201,message:"user created successfully", data: user});
         })
         .catch(errors=>{
             console.log(errors);
         })
   })
   .catch(error=>{
       console.log(error);
   })
  }
  /**
   * @signin methods
   */
  signin(req,res){
    const authUser={
        email:req.body.email,
        password:req.body.password
    };
    User.findOne({where:{email:authUser.email}})
     .then(user=>{
         if(!user){
             return res.status(404).json({error:"whoops! invalid email."})
         }
         //@check password
         const check=bcrypt.compareSync(authUser.password,user.password);
         if(check){
          //@load payload
          const payload={
              id:user.id,
              name:user.name
          };
          //@send payload to jwt
          jwt.sign(payload,process.env.secretOrKey,{expiresIn:3600},(error,token)=>{
              if(error){
                  console.log(error);
              }
              return res.status(200).json({
              token:`Bearer ${token}`,
              message:`Welcome again ${user.name}`});
          })
         }else{
           return res.status(404).json({error:"whoops! authentication failed."})
         }
     })
     .catch(errors=> console.log(errors))
  }
  }

  export default new UserController();