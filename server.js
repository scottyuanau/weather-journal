let projectData = {};

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log('Server Running');
    console.log(`running on localhost: ${port}`);
}


app.post('/addjournal', addJournal);
app.get('/all',getJournal);

let data = [];

function addJournal (req,res) {
    // projectData.date = req.body.date;
    // projectData.temperature = req.body.temperature;
    // projectData.feelings = req.body.feelings;
    data.push(req.body);
    console.log('data received',data);
}

function getJournal (req,res) {
    res.send(data);
    console.log('data sent:',data);
}