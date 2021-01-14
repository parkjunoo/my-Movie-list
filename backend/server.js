const express = require("express");
const bodyParser = require("body-parser");
const path = __dirname + '/app/views/';
const app = express();
app.use(express.static(path));
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