var express = require('express');
var router = express.Router();

/* GET users listing. */

//数据库
let {pool} = require('../config/mysql');
//注册
router.post('/register', function (req, res) {
    console.log(res)
    var sql = "INSERT INTO users (username,`password`,fullname,tel) VALUES (?,?,?,?)";
    pool.query(sql, [req.body.username, req.body.password, req.body.fullname, req.body.tel], function (error, results, fields) {

        //注册成功
        if (error) {
            console.log(error);
            return;
        }
        console.log(results);
        res.json({
            status: true,
            data: results,
            msg: "注册成功!"
        });
    });

});
router.post("/username", function (req, res) {
    var sql = "SELECT username FROM `users` WHERE username=?";
    pool.query(sql, [req.body.username], function (error, results) {
        console.log(results)
        if (results.length == 0) {
            res.json({
                status: false,
            })
            return;
        }
        res.json({
            status: true,
            msg: "账号已存在!"
        })

    })
})
//登录
router.post('/login', function (req, res) {
    var sql = "SELECT * FROM users WHERE username =? AND `password`=?";
    pool.query(sql, [req.body.username, req.body.password], function (error, results) {
        // //登录成功
        if (results.length > 0) {
            res.json({
                status: true,
                msg: "登录成功!",
                uid: results[0].user_id
            });
        } else {
            res.json({
                status: false,
                msg: "账号密码错误!"
            });
        }
    });

});
var users = [{
    id: 1,
    sex: 0,
    username: "黄小米",
    age: 20
}, {
    id: 2,
    sex: 1,
    username: "黄渤",
    age: 48
}]
//获取用户资料 id?
router.get('/info', function (req, res, next) {
    var sql = "SELECT username,fullname,tel FROM users WHERE user_id=?";
    pool.query(sql, [req.query.id], function (error, results) {
        if (results.length == 0) {
            res.json({
                status: false,
                msg: '查无此人!'
            })
            return;
        }
        res.json({
            status: true,
            data: results[0]
        });
    })
    // users.forEach(function (item) {
    //   if (item.id == req.query.id) {
    //     res.json(item);
    //   }
    // });
});

//编辑资料
//传参username age id
// id 不能更改
//把修改之后的个人资料发送json回去
router.post('/edit', function (req, res, next) {
    var sql = "UPDATE   users  SET  username=?,fullname=?,tel=? WHERE user_id=?";
    pool.query(sql, [req.body.username, req.body.fullname, req.body.tel, req.body.user_id], function (error, results) {
        console.log(error, results)
        res.json({
            status: true,
            msg: '修改成功!'
        })
    })
});
//删除
router.post('/delete', function (req, res) {
    var sql = 'DELETE FROM users WHERE user_id=?';
    pool.query(sql, [req.body.id], function (error, results) {
        if (results.affectedRows == 0) {
            res.json({
                status: false,
                msg: "数据不存在"
            })
            return;
        }
        res.json({
            status: true,
            msg: "删除成功"
        })
    })
})
//获取列表
router.get('/list', function (req, res) {
    var sql = "SELECT user_id,username,fullname,tel FROM   users ";
    pool.query(sql, function (error, results) {
        res.json({
            data: results,
            status: true
        })
    })
})
//获取指定id的详情
router.get("/datail", function (req, res) {
    var sql = "SELECT username,fullname,tel FROM users WHERE user_id=?"
    pool.query(sql, [req.query.id], function (error, results) {
        if (results.length == 0) {
            res.json({
                status: false,
                msg: "查无此人!"
            })
            return;
        }
        res.json({
            status: true,
            data: results[0]
        })
    })
});
module.exports = router;
