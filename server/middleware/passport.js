import  {Strategy as JwtStrategy,ExtractJwt} from "passport-jwt";
import dotenv from "dotenv";
import model from "../models/index";
dotenv.config();
const User=model.user;
//@passport configuration
let opts={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey =process.env.secretOrKey;

module.exports=(passport)=>{
 //@passport
 passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    //@find if user is authenticated
    User.findOne({where:{id:jwt_payload.id}})
      .then(user=>{
          return done(null,user);
      })
      .catch(error=>{
          return done(null,false,error);
      })
 }))
}