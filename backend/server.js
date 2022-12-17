import express from "express"
import cors from "cors"
import helmet from "helmet"
import csrf from "csurf"
import restaurants from "./api/restaurants.route.js"

const app = express()

app.use(cors())
app.use(express.json())
app.disable('x-power-by')
app.use(helmet())

// Enable CSRF protection
app.use(csrf({ cookie: true }));

// Add a route that sets a CSRF token in a cookie
app.get('/', (req, res) => {
  res.cookie('csrf-token', req.csrfToken());
  res.send('CSRF token set in cookie');
});

// Add a route that requires a CSRF token
app.post('/submit', (req, res) => {
  res.send('CSRF token validated');
});


app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))



export default app