const express = require ('express'); // require express into the system
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handleBars = require('express-handlebars');
const app = express();

//start server with requiriment and answer
app.listen(3000, function(req, ans){
    console.log('Server is running...');
});


