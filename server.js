
const express = require('express')
const app = express()
const port = 8080
const host = '0.0.0.0';
const path = require('path');
var favicon = require('serve-favicon')
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer')
var device = require('express-device');


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// CONFIG
app.use(express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname, '/public', '/logo.png')))
app.use(device.capture());
require('dotenv').config()

app.get('/', (req, res) => {
  let deviceReq = req.device.type
  console.log(deviceReq)    
  if (deviceReq=="desktop") {
    res.sendFile(path.join(__dirname+'/public/index.html'));
  } else {
    res.sendFile(path.join(__dirname+'/public/index.html'));
  }
})

app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/contato.html'));
})

app.listen(port, host)