const { Pool, Client } = require('pg');

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

function getData(){
    pool.query('SELECT * FROM activities', (err, result) => {
        if( err ){
            throw err;
        }
        return result.rows;
    })
}

module.exports = {
    getData : function(){
        pool.query('SELECT * FROM activities', (err, result) => {
            if( err ){
                throw err;
            }
            return result.rows;
        })
    }
}