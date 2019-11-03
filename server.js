var express = require('express');
var path = require('path'); 
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool, Client } = require('pg');
var app = express();
const port = 5432;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(port, () => console.log("App listening on port: ", port));

const pool = new Pool({
    user: 'clubsadmin',
    host: 'localhost',
    database: 'clubs',
    password: 'iAWyQ2v3FZp',
    port: 4321,
});

pool.query('CREATE TABLE IF NOT EXISTS activities( id serial PRIMARY KEY, user_id VARCHAR(100), name VARCHAR(100) NOT NULL,  object_name VARCHAR(100), object_count INT, difficulty_grade INT, learning_stage INT, siteswap VARCHAR(100))',
    (err, res) => {
    console.log(err, res)
});

function createTrick(trick) {
    console.log(trick);
    if (!trick){
        console.error("object is null");
    }else{
        text = "INSERT INTO activities (user_id,name,object_name,object_count,difficulty_grade,learning_stage,siteswap,description) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)";
        values = [1, 
        trick.name ? trick.name : Error('trick name value is null') , 
        trick.objectName ? trick.objectName : null, 
        trick.objectCount ? trick.objectCount : null, 
        trick.difficulty ? trick.difficulty : null, 
        0,
        trick.siteswap ? trick.siteswap : null, 
        '' ];
        pool.query(text, values, (err, result) => {
            if( err ){
                throw err;
            }
            return result.rows;
        }) 
    }
}

app.get('/getData', (req, res) => {
    pool.query('SELECT * FROM activities', (err, result) => {
        if( err ){
            throw err;
        }
        res.status(200).json(result.rows);
    })
});

app.use(express.static("./"));

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
    console.log('add trick - post request recieved')
    console.log(req)
    output = createTrick(req.body)
    res.redirect('\list')
});