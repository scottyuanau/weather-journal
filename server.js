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
    data.push(req.body);
    console.log('data received',data);
    res.send({}); 
    //post method must return a value, otherwise breaks promise chain.
}

function getJournal (req,res) {
    let newData = data.slice(data.length-1);
    console.log(newData);
    projectData.date = newData[0].date;
    projectData.temperature = newData[0].temperature;
    projectData.feelings = newData[0].feelings;
    res.send(projectData);
    console.log('data sent:',projectData);
}