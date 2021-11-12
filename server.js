// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5000;
const server = app.listen (port, listening);

function listening (){
    console.log (`server is running on localhost: ${port}`);
}


// GET route
app.get('/all', sendData);

function sendData (req, res) {
    res.send(projectData);
};

// POST route
app.post('/addData', addingEntry);

function addingEntry(req,res){
  value = {
      date: req.body.date,
      temp: req.body.temp,
      content: req.body.content
  } //a new entry in the apps endpoint, which is the data received from the client side POST.
  Object.assign(projectData, value);
  console.log (projectData);
}