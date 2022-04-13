const express = require('express'); //Allows to set up middlewares to respond to HTTP Requests
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');

/**Load Logging To Capture Events*/
const {setupLogging} = require("./logger/ReceptionistLogger");

const app = express();

setupLogging(app);

app.use(bodyParser.json());

app.listen(4444, () => {
    console.log('up and running')
})

mongoose.connect("mongodb+srv://PranjaliK:Pranjali03@cluster0.eu7ug.mongodb.net/ReceptionDB?retryWrites=true&w=majority", () => {
console.log("Connected to database");
});

require('./Receptionist');
const Receptionist = mongoose.model("Receptionist")

app.post('/addReceptionist', (req, res, next) => {
    var newReceptionist = {
        managerId: mongoose.Types.ObjectId( req.body.managerId),
        receptionistName: req.body.receptionistName,
        receptionistAge: req.body.receptionistAge,
        receptionistGender: req.body.receptionistGender,
 
    }
    var receptionist = new Receptionist(newReceptionist);
    receptionist.save().then(() => {
        console.log("New Receptionist created");
    }).catch(next);
    res.send("Receptionist "+ receptionist.receptionistName+" is added.")
});

app.get('/getAllReceptionist', (req, res, next) => {
    Receptionist.find().then((receptionists) => {
        res.json(receptionists);
    }).catch(next);
});

app.get("/getReceptionistById/:id", (req, res, next) => {
    Receptionist.findById(req.params.id).then((receptionists) => {
        if (receptionists) {
            axios.get("http://localhost:3333/getManagerById/" + receptionists.managerId).then((response)=>
            {
                console.log(response);
                var receptionistObject = {ReportingManager : response.data.managerName ,ReceptionistName :receptionists.receptionistName}
               
                res.json(receptionistObject);
                })
        }
        else {
           
        }
    }).catch(next);
})

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

app.all('*', function(req, res) {
    throw new Error("Bad request/ Wrong URL")
})

app.use(function(e, req, res, next) {
    if (e.message === "Bad request/ Wrong URL") {
        res.status(400).json({error: {msg: e.message}});
    }
});