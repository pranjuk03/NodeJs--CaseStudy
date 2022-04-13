const mongoose = require('mongoose');

mongoose.model("Receptionist", {
    managerId:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    receptionistName: {
        type: String,
        required: true
    },
    receptionistAge: {
        type: Number,
        required: true
    },
    receptionistGender: {
        type: String,
        required: false
    },
});