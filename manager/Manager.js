const mongoose = require('mongoose');

mongoose.model("Manager", {
    managerName: {
        type: String,
        required: true
    },
    managerAge: {
        type: Number,
        required: true
    },
    managerGender: {
        type: String,
        required: false,
        default: "M"
    },
});