var Express = require('express');
var MongoClient = require('mongodb').MongoClient;
var cors=require('cors');
const multer = require('multer');

var app = Express();
app.use(cors());

var CONNECTION_STRING="";

var DATABASENAME = "applcation";
var database;

app.listen(5038, () =>{
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        database = client.db(DATABASENAME);
        console.log("Connected to `" + DATABASENAME + "`!");
    });
})




