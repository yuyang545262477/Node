var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

//路由
var routes = require('./routes/index');
var settings = require('./settings');
var flash = require('connect-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: settings.cookieSecret,
    ket: settings.db,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30days
    store: new MongoStore({
        db: settings.db,
        host: settings.host,
        port: settings.port
    })
}));

var app = express();

// app.set('port', process.env.PORT || 3000);//设置端口
app.set('views', path.join(__dirname, 'views'));//设置视图
app.set('view engine', 'ejs');//设置视图模板
app.use(flash());


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


routes(app);
app.listen(app.get('port'), function () {
    console.log("Express server listening on port", app.get('port'));
});

module.exports = app;