
const api = require('./api');

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = new express();
         
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
<<<<<<< HEAD

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

=======
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
app.use(api);

app.use(express.static(path.resolve(__dirname,'../dist')));

<<<<<<< HEAD

app.use((req,res,next)=>{
	next();
})

=======
app.use((req,res,next)=>{
	next();
})
app.get('*',function(rep,res){
/*
	const html =  fs.readFileSync(path.resolve(__dirname,'../dist/index.html','utf-8'));
	res.send(html);
*/
});
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a

app.listen(8088,function(){
	console.log('server listening at port 8088');
});
