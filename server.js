//DEPENDENCIES
const express = require("express");
const path = require("path");


//APP/PORT
const app = express();
const PORT = process.env.PORT || 3001;


//MIDDLEWARE
// stuff to get the req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//static assets
app.use(express.static("public"));



//ROUTES
//HTML Routes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//API Routes

