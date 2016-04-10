module.exports = function (app) {
    //首页
    app.get('/', function (req, res) {
        res.render('index', {title: '主页'});
    });


    //注册页面
    app.get('/reg', function (req, res) {
        res.render('reg', {title: '注册'});
    });
    app.post('/reg', function (req, res) {
       
    });
    //登录页面
    app.get('/login', function (req, res) {
        res.render('login', {title: '登录'});
    });
    app.post('/login', function (req, res) {

    });
    //博文
    app.get('/post', function (req, res) {
        res.render("post", {title: '发表'})
    });
    app.post('/post', function (req, res) {

    });

//    登出.
    app.get('/logout', function (req, res) {

    });

};