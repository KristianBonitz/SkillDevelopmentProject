var express = require('express');
var path = require('path'); 
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/config.js');
var app = express();
const port = 5432;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static("./"));

app.listen(port, () => console.log("App listening on port: ", port));

console.log(config);
console.log(config.log("something?"));

app.get('/getData', (req, res) => {
    config.getData.then(output => {
        res.status(200).json(output);
    })
});

app.get('/', (req, res) => {
    var options = {
        root: path.join(__dirname, 'views/'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
    }
    res.sendFile("index.html", options, (err) => {
        err ? console.log(err) : console.log("Sent index.html")
    });
});

app.get('/timer', (req, res) => {
    var options = {
        root: path.join(__dirname, 'views/'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
    }
    res.sendFile("timer.html", options, (err) => {
        err ? console.log(err) : console.log("Sent timer.html")
    });
});

app.get('/list', (req, res) => {
    var options = {
        root: path.join(__dirname, 'views/'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
    }
    res.sendFile("list.html", options, (err) => {
        err ? console.log(err) : console.log("Sent list.html")
    });
});

app.post('/addTrick', (req, res) => {
    console.log('# add trick - post request recieved');
    output = config.createTrick(req.body);
    res.redirect('\list');
});

app.post('/deleteTrick', (req, res) => {
    console.log('# delete trick - post request recieved');
    output = config.deleteTrick(req.body.id);
});



