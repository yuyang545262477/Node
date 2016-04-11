var mongodb = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

//存储用户信息
User.prototype.save = function (callback) {
//    即将存入数据库的文档
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };
//    打开数据库.
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }//错误,返回错误信息.
        //    读取User集合.
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //    将用户数据插入到users集合
            collection.insert(user, {
                safe: true
            }, function (err, user) {
                mongodb.close();
                if (err) return callback(err);
                callback(null, user[0]);
            })
        })
    })
};

//读取用户信息.
User.get = function (name, callback) {
//    首先打开数据库
    mongodb.open(function (err, db) {
        if (err) return callback(err);
        //    读取users集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //查找用户名
            collection.findOne({
                name: name
            }, function (err, user) {
                if (err) {
                    return callback(err);
                }
                callback(null, user);
            })
        })

    })
};

