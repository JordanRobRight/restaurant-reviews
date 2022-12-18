import express from "express"
import cors from "cors"
import helmet from "helmet"
import csurf from "csurf"
import cookieParser from 'cookie-parser'
import bodyParser from "body-parser"
import restaurants from "./api/restaurants.route.js"

const csrfProtection = csurf({cookie: true});
const parseForm = bodyParser.urlencoded({extended:false})

const app = express()

app.use(cors())
app.use(express.json())
app.disable('x-power-by')
app.use(helmet())
app.use(cookieParser())

app.get('/form', csrfProtection, function(req,res){
  //res.render('send',{csrfToken: req.csrfToken()})
  res.send({csrfToken:req.csrfToken()})
})

app.post('/process', parseForm, csrfProtection, function(req,res){
 res.send('data is being processed')
})

/*// Add a route that sets a CSRF token in a cookie
app.get('/', (req, res) => {
  res.cookie('csrf-token', req.csrfToken());
  res.send('CSRF token set in cookie');
});


// Enable CSRF protection
app.use(csrfProtection);
app.get('/getCSRFToken', (req, res)=>{
  res.json({csrfToken: req.csrfToken()});

});

// Add a route that requires a CSRF token
app.post('/submit', (req, res) => {
  res.send('CSRF token validated');
});*/


app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))



export default app