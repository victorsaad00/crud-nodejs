const express = require ('express'); // require express into the system
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const { ftruncate } = require('fs');
const app = express();
const urlEncodeParser = bodyParser.urlencoded({extended:false});

// connect to db
const sql = mysql.createPool({
    user: 'b0c21b3e4b1bca',
    pass: '87459ee4',
    host: 'us-cdbr-east-02.cleardb.com/',
    database: 'heroku_9b6d3ff2ea9f1ac'
});

let port = process.env.PORT || 3000;

app.use('/img', express.static('img'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

// Template Engine
app.engine("handlebars", handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Building routes and templates
app.get("/", function(req, ans){
    // ans.send('TESTE');
    //ans.sendFile(__dirname + "/index.html");
    ans.render('index');
    //console.log(req.params.id); // get id parameterk
});


//app.get('/jslayout', function(req, ans) {ans.sendFile(__dirname + '/js/jslayout.js');});
//app.get('/style', function(req, ans) {ans.sendFile(__dirname + '/css/style.css');});

app.get('/insert', function(req, ans){ans.render('insert');});

app.get('/select:id?', function(req, ans){ 
    
    if(!req.params.id){
        sql.getConnection(function(err, connection){
            connection.query('SELECT * FROM user ORDER BY id asc', function(err, results, fields){
                        ans.render('select', {data: results});
                    });
        });
    } else {
        sql.getConnection(function(err, connection){
            connection.query('SELECT * FROM user WHERE id = ? ORDER BY id asc', [req.params.id], function(err, results, fields){
                        ans.render('select', {data: results});
            });
        });
    }
});

//app.get('/delete', function(req, ans){ ans.render('delete');});
//app.get('/update', function(req, ans){ ans.render('udpate');});
/*
app.post('/controllerForm',urlEncodeParser , function(req, ans){
    sql.query('INSERT INTO USER VALUES ( ?, ?, ?)', [req.body.id, req.body.name, req.body.age]);
    ans.render('controllerForm', {name:req.body.name});
});

app.get('/delete/:id', function(req, res){
    sql.query('DELETE FROM user WHERE id=?', [req.params.id]);
    res.render('delete');
});

app.get("/update/:id", function(req, ans) {
    sql.query("SELECT * FROM user WHERE id=?", [req.params.id], function(err,results, fields){
        ans.render('update', {id:req.params.id, name: results[0].name, age: results[0].age});
    });
});

app.post("/controllerUpdate", urlEncodeParser, function(req, ans) {
    sql.query("update user set name=?,age=? where id=?", [req.body.name, req.body.age, req.body.id]);
    ans.render('controllerUpdate');
});
*/
//start server with requiriment and answer
app.listen(port, function(req, ans){console.log('Server is running...');});



