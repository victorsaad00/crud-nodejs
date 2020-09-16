const express = require ('express'); // require express into the system
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const { ftruncate } = require('fs');
const app = express();
const urlEncodeParser = bodyParser.urlencoded({extended:false});

// connect to db
const sql = mysql.createConnection({
    host: 'localhost', 
    user:'root',
    password:'',
    port:3306
});

// using db
sql.query('use crudnodejs');

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
        sql.query('SELECT * FROM user ORDER BY id asc', function(err, results, fields){
            ans.render('select', {data: results});
        });
    } else {
        sql.query('SELECT * FROM user WHERE id = ? ORDER BY id asc', [req.params.id], function(err, results, fields){
            ans.render('select', {data: results});
        });
    }
});

//app.get('/delete', function(req, ans){ ans.render('delete');});
//app.get('/update', function(req, ans){ ans.render('udpate');});

app.post('/controllerForm',urlEncodeParser, function(req, ans){
    sql.query('INSERT INTO USER VALUES ( ?, ?, ?)', [req.body.id, req.body.name, req.body.age]);
    ans.render('controllerForm', {name:req.body.name});
});

app.get('/delete/:id', function(req, res){
    sql.query('DELETE FROM user WHERE id=?', [req.params.id]);
    res.render('delete');
});


//start server with requiriment and answer
app.listen(3000, function(req, ans){console.log('Server is running...');});


