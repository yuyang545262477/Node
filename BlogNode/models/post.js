var mongodb = require('./db');

//函数原型
function Post(name, title, post) {
    this.name = name;
    this.title = title;
    this.post = post;
}

//导出模型
module.exports = Post;


//存储一篇文章及其相关信息
Post.prototype.save = function (callback) {
    var date = new Date();
//    各种时间格式.
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + '-' + (date.getMonth() + 1),
        day: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
        minute: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + ':' + (date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes())
    };

//    即将存入数据库的文档
    var post = {
        name: this.name,
        time: time,
        title: this.title,
        post: this.post
    };
//    打开数据库.
    mongodb.open(function (err, db) {
        if (err) return callback(err);
        //    读取数据
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //    将文档插入到POST
            collection.insert(post,
                {safe: true}, function (err) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null);
                });
        });

    });
};


//读取文章及其相关信息
Post.get = function (name, callback) {
//    打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //    读取post集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if (name) {
                query.name = name;
            }
            //    根据query 对象查询文章
            collection.find(query).sort({
                time: -1
            }).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, docs);
            })
        })

    })
};