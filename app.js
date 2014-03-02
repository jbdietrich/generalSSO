var express = require('express'),
    jwt     = require('./routes/jwt'),
    saml    = require('./routes/saml'),
    logout  = require('./routes/logout'),
    http    = require('http'),
    path    = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon('./public/images/tso.ico'));
app.use(express.logger(''));
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.redirect(301, '/jwt');
});
app.get('/jwt', jwt.display);
app.post('/jwt', jwt.generate);
app.get('/saml', saml.display);
app.post('/saml', saml.generate);
app.get('/logout', logout.display);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
