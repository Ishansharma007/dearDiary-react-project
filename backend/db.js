const mongoose = require("mongoose");

const mongoUrl = "mongodb://localhost:27017/inotebookDB";

const connectToMongo = () => {
    mongoose.connect(mongoUrl, () => {
        console.log("Connected to mongo database on port 27017");
    }, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = connectToMongo ;