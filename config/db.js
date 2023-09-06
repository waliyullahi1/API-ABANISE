const mongoose = require('mongoose')

const connectdb = async () =>{
    try{
        await mongoose.connect(process.env.DATA_BASE, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch  (err) {
        console.error(err);
    }
}

module.exports = connectdb
