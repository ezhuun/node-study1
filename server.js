/* http 서버 구동
var http = require("http");
var fs = require("fs");
var url = require("url");

//서버생성
http.createServer(function(req, res){
  //url 파라미터 파싱
  var pathname = url.parse(req.url).pathname;
  console.log("Request for " + pathname + " received.");

  if(pathname == "/"){
    pathname = "/index.html";
  }

  fs.readFile(pathname.substr(1), function(err,data){
    if(err){
      console.log(err);
      res.writeHead(404, {'Content-Type': 'text/html'});
    }else{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data.toString());
    }
    res.end();
  })
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');
*/

/* express 활용1
var express = require("express");
var app = express();
var router = require("./router/main")(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
  console.log("Express server has started on port 3000");
});
app.use(express.static('public'));
*/

/* express 활용2 login/logout 구현 */
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var fs = require("fs");

app.set("views", __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require("ejs").renderFile);

var server = app.listen(3000, function(){
  console.log("Express server has started on prt 3000");
});
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));

var router = require("./router/main")(app, fs);
