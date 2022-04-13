const express = require('express'); //Node.js follows the CommonJS module system, and the builtin require function is the
// easiest way to include modules that exist in separate files. The basic functionality of require is that it reads a JavaScript file,
// executes the file, and then proceeds to return the exports object.
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //Body-parser is the Node. js body parsing middleware. 
//It is responsible for parsing the 
//incoming request bodies in a middleware before you handle it. 

/**Load Logging To Capture Events*/
const {setupLogging} = require("./logger/ManagerLogger");

require('./Manager');
const Manager = mongoose.model("Manager")

const app = express();

setupLogging(app);

app.listen(3333, () => {
    console.log('up and running')
})

app.use(bodyParser.json());

// Mongo Atlas Connection
mongoose.connect("mongodb+srv://PranjaliK:Pranjali03@cluster0.eu7ug.mongodb.net/ManagerDB?retryWrites=true&w=majority", () => {
console.log("Connected to database");
});

// PostMapping for adding a Manager
app.post('/addManager', (req, res, next) => {
    //object
    var newManager = {
        managerName: req.body.managerName,
        managerAge: req.body.managerAge,
        managerGender: req.body.managerGender,
    }
    //pass to manager model
    var manager = new Manager(newManager);
    manager.save().then(() => {
        console.log("New Manager created");
        res.send("Manager "+ manager.managerName+" is added.")
    }).catch(next);
});

// GetMapping for all Managers List
app.get('/getAllManagers', (req, res, next) => {
    Manager.find().then((managers) => {
        res.json(managers);
    }).catch(next);
});

//GetMapping for Manager's Details by ID
app.get("/getManagerById/:id", (req, res) => {
    Manager.findById(req.params.id)
    .then((managers) => res.status(200).json(managers))
    .catch((err) => res.status(500).json("Error: " + err));
});

//DeleteMapping to delete Manager using ID
app.delete("/deleteManager/:id", (req, res, next) => { //The app. delete() method routes all
    // the HTTP DELETE requests to the specified path with the specified callback functions.
    Manager.findByIdAndDelete(req.params.id).then((managers) => {
        if (managers) {
            res.send("Deleted Manager sucessfully"+ Manager.id);
        }
        else {
            res.sendStatus(404);
        }
    }).catch(next); //The next function is a function in the Express router which, when invoked, 
    //executes the middleware succeeding the current middleware
})

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

app.all('*', function(req, res) {
    throw new Error("Bad request/ Wrong URL")
})

app.use(function(e, req, res, next) { //The req object represents the HTTP request and has properties 
    //for the request query string, parameters, body, and HTTP headers

    //The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
    if (e.message === "Bad request/ Wrong URL") {
        res.status(400).json({error: {msg: e.message}});
    }
});