var Express = require('express');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');
require('dotenv').config();

var app = Express();
app.use(cors());

var CONNECTION_STRING = process.env.DB_CONNECTION;

var DATABASENAME = "applcation";
var database;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        database = client.db(DATABASENAME);
        console.log("Connected to `" + DATABASENAME + "`!");
    });
})

app.get('/backend/applcation/GetNotes', (request, response) => {
    var collection = database.collection("applicationcollection");
    collection.find({}).toArray((error, result) => {
        response.send(result);
    });
})

app.post('/backend/applcation/AddNotes', upload.single('newNotes'), (request, response) => {
    var collection = database.collection("applicationcollection");
    collection.count({}, function(error, numOfDocs){
        collection.insertOne({
            id: (numOfDocs + 1).toString(),
            des: request.body.newNotes
        });
        response.json("Added Successfully");
    });
})

app.delete('/backend/applcation/DeleteNotes', (request, response) => {
    var collection = database.collection("applicationcollection");
    var id = request.query.id;
    collection.deleteOne({
        id: id
    }, (error, result) => {
        if (error) {
            response.status(500).json({ error: "An error occurred while deleting the note." });
        } else {
            response.json("Deleted Successfully");
        }
    });
})
