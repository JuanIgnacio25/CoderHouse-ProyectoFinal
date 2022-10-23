const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const {logger} = require('../utils/logger');

const {UserService} = require("../modules/user/UserService");
const userService = new UserService(process.env.NODE_ENV);


const authenticationCheck = async (req, res, next ) => {
  try{
    let user = await userService.findUser(req.body.email);
    if (user === undefined ) {
      return res.status(404).send({error: `There isnt an account with the email: ${req.body.email}`});
    }
    
    if(await bcrypt.compare(req.body.password, user.password)){
      const accessToken = generateAccessToken(user.toJSON())
      res.clearCookie("token");
      res.cookie("token",accessToken, {
        httpOnly:true
      });
      next();
    } else{
      res.render("failLogin.ejs",{error: "Incorrect Password"});
    }
  }catch(err){
    console.log(err);
    //logger.error(`Error: ${err}`)
    res.sendStatus(500).send();
  }
}

const authenticateToken = ( req, res, next ) => {
  const token = req.cookies.token;
  const url = req.originalUrl;
  if(url === "/login" || url === "/signin" || url === "/signin?"){
    if (token){
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (!err) {
          res.redirect("/productos");
        } else {
          next();
        }
      });
    } else{
      next();
    }
  } else {
    if (token){
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (!err) {
          req.user = user;
          const {email, name, password, cart_Id, address,id,admin} = user;
          const accessToken = generateAccessToken({email, name, password, cart_Id, address,id,admin});
          res.cookie("token",accessToken, {
            httpOnly:true
          });
          next();
        } else {
          console.log(err);
          res.redirect("/login");
        }
      })
    } else{
      res.redirect("/login");
    }
  }
}

const isAdmin = ( req, res, next ) => {
  if(req.user.admin){
    next();
  } else {
    res.status(403).send({error: "You do not have admin permissions for this request"});
  } 
}


const generateAccessToken =  (user) => {
  const expire = String(process.env.TOKEN_EXPIRING_TIME);
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: expire });
}

module.exports = {authenticationCheck, authenticateToken, isAdmin}