//DEPENDENCIES
const express = require("express");
const path = require("path");
const db = require("./db/db.json")
const fs = require("fs");
const { error } = require("console");
const { readFromFile } = require("./helpers/fsUtils");

//APP/PORT
const app = express();
const PORT = process.env.PORT || 3001


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
//Saving Note
app.post('/api/notes', (req, res) => {
    let newNote = {
        id: Math.round(Math.random()*100),
        title: req.body.title,
        text: req.body.text
    };
    //Add new note object to existing db file
     db.push(newNote)
    
    //Convert db array object to string
    const dbJSON = JSON.stringify(db);

     fs.writeFile("./db/db.json", dbJSON, (err) => {
        if (err) throw error
        res.status(200).send("Note added successfully");
    })
     

});
//Getting All Notes
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})


//INITIALIZATION
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);