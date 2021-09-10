const express = require('express');
const app = express();
const body = require('body-parser');
const user = require('./public/route/user')
var session = require('express-session')
app.use( body.urlencoded({extended:false}));
app.use(body.json())

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  
}))

app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',__dirname+'/public/views')

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/views/home.html')
})

app.use('/user', user)
app.listen(4000,()=>{console.log('port 4000')})