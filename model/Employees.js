const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const employeesScheme = new Scheme({
    firstname: {
        type : String,
        require: true
    },
    lastname: {
        type : String,
        require: true
    }
})

module.exports = mongoose.model("Employee", employeesScheme);