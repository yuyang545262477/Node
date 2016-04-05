//创建主要的目录
var express = require('express');
var port = process.env.PORT || 3000;
var app = express();


app.set('views','./views');
app.set('view engine','jade');
app.listen(port);


console.log('ProjectOne is running . port is :',port);


//路由.
//index
app.get('/',function (req, res) {
    res.render('index',{
        title:'电影网首页'
    })
});
//detail
app.get('/movie/:id',function (req, res) {
    res.render('detail',{
        title:'电影详情页面'
    })
});
//admin
app.get('/admin/movie',function (req, res) {
    res.render('admin',{
        title:'电影后台录入'
    })
});
//list
app.get('/admin/list',function (req, res) {
    res.render('list',{
        title:'电影网列表'
    })
});
