var crypto = require('crypto'),
    User = require('../models/user');


module.exports = function (app) {
    //首页
    app.get('/', function (req, res) {
        res.render('index', {
            title: '主页',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });


    //注册页面
    app.get('/reg', function (req, res) {
        res.render('reg', {
            title: '注册',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    app.post('/reg', function (req, res) {
        var name = req.body.name,
            password = req.body.password,
            password_re = req.body['password-repeat'];

        if (password !== password_re) {
            req.flash('error', '两次密码的输入不一致');
            return res.redirect('/reg');//重定向到注册页面
        }
        //加密密码.
        var md5 = crypto.createHash('md5'),
            password_md5 = md5.update(password).digest('hex');

        var newUser = new User({
            name: name,
            password: password_md5,
            email: req.body.email
        });
        //    检测用户名是否存在.
        User.get(newUser.name, function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');//重定向至注册页面
            }
        });
        //    通过检测,就增加新用户
        newUser.save(function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }
            req.session.user = newUser;
            req.flash('success', '注册成功');
            res.redirect('/');
        })

    });
    //登录页面
    app.get('/login', function (req, res) {
        res.render('login', {
            title: '登录',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
    app.post('/login', function (req, res) {
        //    生成密码的md5值
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        //    检测用户是否存在.
        User.get(req.body.name, function (err, user) {
            if (!user) {
                req.flash('error', '用户不能存在!');
                return res.redirect('/login');//重定向至登录页面
            }
            //    检测密码是否正确.
            if (user.password != password) {
                req.flash('error', '密码不正确');
                return res.redirect('/login'); //重定向至老地方
            }
            //    用户名,存在,并且密码正确的时候 ,将用户信息存入 session .
            req.session.user = user;
            req.flash('success', '登录成功');
            res.redirect('/'); //这次重定向到老地方.
        });


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