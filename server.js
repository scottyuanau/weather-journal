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

let data = [];
app.post('/addjournal', addJournal);




function addJournal (req,res) {
    data.push(req.body);
    console.log(data);
}