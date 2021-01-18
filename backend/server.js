const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({dest: './upload'});
const sql = require("./app/models/db.js");
const app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
app.use(session({
  secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

app.use(express.static('public'));
app.use(express.static('app/views/img'));
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});
require("./app/routes/movie.routes.js")(app);
// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
app.use('/image',express.static('./upload'));
app.use('/static',express.static('./app/views/img'))

app.post('/upload', (req, res, next) => {
  upload.single('image')(req, res, function (err) {
      if (err) {
        res.send({msg: err.message})
      } else {
        const file = req.file;
        res.send(file.filename)
      }
  });
})

app.post('/admin/:password', (req, res, next) =>{
  sql.query(`SELECT * FROM admin WHERE password = ${req.params.password}`, (err, result) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (result.length) {
      console.log("found admin: ", res);
      res.send("success");
      return;
    }else{
      res.send("login - fail");
    }
  });
});