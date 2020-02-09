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

module.exports.log = function(msg){
    console.log(msg);
    return 'Not again...'
};

module.exports.getData = new Promise( function(res, err){
    pool.query('SELECT * FROM activities', (err, result) => {
        if( err ){
            throw err;
        }
        res(result.rows);
    })
});

module.exports.createTrick = function(trick) {
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
            console.log(result);
            return result.rows;
        }) 
    }
};

module.exports.deleteTrick = function deleteTrick(trickID) {
    console.log("deleting trick " + trickID);
    if (!trickID){
        console.error("object is null");
    }else{
        text = "DELETE FROM activities WHERE id = $1";
        values = [trickID];
        pool.query(text, values, (err, result) => {
            if( err ){
                throw err;
            }
            return result;
        }) 
    }
}

