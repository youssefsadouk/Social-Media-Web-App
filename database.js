const mongoose = require("mongoose");

class Database{
    constructor(){
        this.connect();
    }
    connect(){
        mongoose.connect("mongodb+srv://admin0:0001@twitterclonecluster0.eyiiaud.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
            console.log("database connection successful");
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

module.exports = new Database();