import express from "express"
import cors from "cors"
import helmet from "helmet"
//import csrf from "csurf"
import mongoose, { isObjectIdOrHexString } from "mongoose"
import bodyParser from "body-parser"
import restaurants from "./api/restaurants.route.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
//import User from './models/user'


const app = express()

const urlencodedParser = bodyParser.urlencoded({extended:false})
app.use(bodyParser.json(), urlencodedParser)

app.use(cors())
app.use(express.json())
app.disable('x-power-by')
app.use(helmet())

function verifyJWT(req,res,next){
  const token = req.headers['x-access-token']?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded)=>{
      if (err) return res.json({
        isLoggedIn: false,
        message:'failed to authenticate'
      })
      req.user = {};
      req.user.id = decoded.username;
      next();
    })
  }else{
      res.json({message:'incorrect token given', isLoggedIn:false})
    }
  }




/*Add a route that sets a CSRF token in a cookie
app.get('/', (req, res) => {
  res.cookie('csrf-token', req.csrfToken());
  res.send('CSRF token set in cookie');
});
// Add a route that requires a CSRF token
app.post('/submit', (req, res) => {
  res.send('CSRF token validated');
});
// Enable CSRF protection
app.use(csrf({ cookie: true }));*/

//accessing the current user
app.get('/getUsername', verifyJWT, (req,res)=> {
  res.json({isLoggedIn:true, username: req.user.username})
})



app.post('/register', async (req, res)=>{
  const user = req.body;
  const takenUsername = await user.findOne({username:user.username})
  const takenEmail = await user.findOne({email:user.email})
  
  if(takenUsername || takenEmail){
    res.json({message: "Username or email has already been taken"})
  }else{
    user.password = await bcrypt.hash(req.body.password, 10)
    const dbUser = new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password
    })
    dbUser.save()
    res.json({message: "success"})
  }
})

app.post('/login_cd', (req,res) => {
  const userLoggingIn = req.body;
  User.findOne({username: userLoggingIn.username})
  .then(dbUser => {
    if(!dbUser){
      return res.json({
        message: 'Invalid Username or Password'
      })
    }
    bcrypt.compare(userLoggingIn.password, dbUser.password)
    .then(isCorrect=> {
      if (isCorrect){
        const payload = {
          id: dbUser._id,
          username: dbUser.username,
        }
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {expiresIn: 86400},
        (err, token)=>{
          if (err) return res.json({message: err})
          return res.jason({
            message: "success",
            token: "Bearer " + token
          })
         }
       )
      }
      else{
        return res.json({
          message: 'invalid username or password'
        })
      }
    })
  })
})


app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))



export default app