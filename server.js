var express = require('express');
var path = require('path'); 
const cors = require('cors');
const { Pool, Client } = require('pg');
var app = express();
const port = 5432;

app.use(cors());

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

app.get('/list', (req, res) => {
    var options = {
        root: path.join(__dirname, 'views/'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
    }
    res.sendFile("trickList.html", options, (err) => {
        err ? console.log(err) : console.log("Sent activityList.html")
    });
});