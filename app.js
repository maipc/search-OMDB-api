const express = require("express");
const bodyParser = require("body-parser");
const rp = require("request-promise");
var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/searchMovie", (req, res) => {
  var movie = req.body.movie.replace(/\s+/g, "+");
  var url = "http://www.omdbapi.com/?s=" + movie + "&apikey=thewdb";
  rp(url)
    .then(function(body) {
        var data = JSON.parse(body);
        res.render("searchPage", {data:data});
    })
    .catch(function(err) {
        console.log("error: ", err);
    });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
