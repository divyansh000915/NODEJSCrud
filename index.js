const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Divyansh@2021',
    database: 'node_mysql_crud_db',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


//Get all users
app.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an users
app.get('/users/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM users WHERE ID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an users
app.delete('/users/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM users WHERE ID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an users

app.post('/users', (req, res) => {
    let newusr = req.body;
    var query = mysqlConnection.query('INSERT INTO users SET ?', newusr, function (err, rows, fields) {
        // if (error) throw error;
        // // Neat!
        if (!err)
        // rows.forEach(element => {
        //     if(element.constructor == Array)
            res.send('Inserted user id : '+newusr[0]);
        // });
    else
        console.log(err);
    })
});



//Update an users
app.patch('/users/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM users WHERE ID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            {
                //res.send(rows);
                const fieldsToUpdate ={}
                const newusr = req.body;
                // for (const field of newusr) {
                //     fieldsToUpdate[field.name] = field.value;
                // }
                console.log(fieldsToUpdate)
                var query = mysqlConnection.query("UPDATE users SET ? WHERE id = '" + req.params.id+"'", newusr, function (err, rows, fields) {
                    // if (error) throw error;
                    // // Neat!
                    if (!err)
                    // rows.forEach(element => {
                    //     if(element.constructor == Array)
                        res.send('Inserted user id : '+newusr[0]);
                    // });
                else
                    console.log(err);
                })
            }
        else
            console.log(err);
    })
});


