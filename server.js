var express = require('express');
var path = require('path'); 
const { Pool, Client } = require('pg');
var app = express();
const port = 5432;

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
pool.query('INSERT INTO activities (user_id, name, object_name, object_count, difficulty_grade, learning_stage, siteswap) VALUES($1, $2, $3, $4, $5, $6, $7) ',
    [1,'Mills Mess','Ball',3,1,3,'3'], (err, res) => {
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
console.log(__dirname);
app.use(express.static("./"));

app.get('/', (req, res) => {
    var options = {
        root: path.join(__dirname, 'public'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
    }
    res.sendFile("views/index.html", options, (err) => {
        err ? console.log(err) : console.log("Sent index.html")
    });
});