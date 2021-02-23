var express = require('express');
var router = express.Router();
//数据库
var pool = require('../config/mysql').pool;

//添加分类 parents_id ,name
//约定,一级分类 parent_id:1
router.post("/category/add", function (req, res) {
    var sql = 'INSERT into category(`name`,parent_id)VALUES(?,?);'
    pool.query(sql, [req.body.name, req.body.parent_id], function (error, results) {
        res.json({
            status: true,
            msg: '添加成功'
        });
    });
});
//删除分类
router.post("/category/delete", function (req, res) {
    var sql = "DELETE FROM category WHERE category_id=? OR parent_id=?";
    pool.query(sql, [req.body.category_id, req.body.category_id], function (error, results) {
        if (results.affectedRows == 0) {
            res.json({
                status: false,
                mas: "id无效"
            })
            return;
        }
        res.json({
            status: true,
            msg: "删除成功!"
        });
    });
});

//编辑分类
router.post("/category/edit", function (req, res) {
    var sql = "UPDATE category SET `name`=?,parent_id=? WHERE category_id=?";
    pool.query(sql, [req.body.name, req.body.parent_id, req.body.category_id], function (error, results) {
        res.json({
            status: true,
            msg: "修改成功!"
        });
    });
})
//获取所有分类
router.get("/category/list", function (req, res) {
    var sql = "SELECT c1.*,c2.`name` AS parent_name FROM `category` c1 left JOIN category c2 ON c1.parent_id = c2.category_id";
    pool.query(sql, function (error, results) {
        res.json({
            data: results,
            status: true
        })
    })
})

//获取指定id的分类详情
router.get("/category/datail", function (req, res) {
    var sql = "select * from category where category_id=?";
    pool.query(sql, [req.query.id], function (error, results) {
        if (results.affectedRows == 0) {
            res.json({
                status: false,
                msg: "id无效"
            })
            return;
        }
        res.json({
            status: true,
            data:results[0],
            msg: "获取成功!"
        })
    })
})
//获取一级分类
router.get("/category/first", function (req, res) {
    var sql = "select * from category where parent_id=0";
    pool.query(sql,function (error, results) {
        res.json({
            status: true,
            data:results,
            msg: "获取成功!"
        })
    })
})

//添加文章
router.post("/article/add", function (req, res) {
    var sql = "INSERT INTO article (category_id, title,description,content,create_date,main_photo)VALUES (?,?,?,?,CURRENT_TIMESTAMP(),?)";
    pool.query(sql, [req.body.category_id, req.body.title, req.body.description, req.body.content,req.body.main_photo], function (error, results) {
        res.json({
            status: true,
            mas: "添加成功!"
        })
    });

})

//删除指定id的文章
router.post("/article/delete", function (req, res) {
    var sql = "DELETE FROM article WHERE article_id=?";
    pool.query(sql, [req.body.article_id], function (error, results) {
        if (results.affectedRows == 0) {
            res.json({
                status: false,
                msg: "id无效"
            })
            return;
        }
        res.json({
            status: true,
            mas: "删除成功!"
        })
    })
});

//获取指定id的详情
router.get("/article/datail", function (req, res) {
    var sql = "SELECT * FROM article WHERE article_id=?"
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
            data:results[0]
        })
    })
});

//编辑指定id
router.post("/article/edit",function(req,res){
    var sql="UPDATE  article SET category_id=?, title=?,description=?,content=?,main_photo=? WHERE article_id=?"
    pool.query(sql,[req.body.category_id,req.body.title,req.body.description,req.body.content,req.body.main_photo,req.body.article_id],function(error,results){
        if(results.affectedRows==0){
            res.json({
                status: false,
                msg: "查无此人!"
            })
            return;
        }
        res.json({
            status: true,
            msg:"编辑成功"
        })
    })
})

//获取所有文章,默认按照日期降序显示 分页: pagesize一页几篇 pageindex第几页
router.get("/article/all",function(req,res){
    var pagesize=parseInt(req.query.pagesize);
    var pageindex=parseInt(req.query.pageindex);
    var offset=parseInt(pagesize*(pageindex-1));
    var sql="SELECT article.*,category.`name`,DATE_FORMAT(create_date,'%Y-%m-%d %T') AS create_time,DATE_FORMAT(update_date,'%Y-%m-%d %T') AS update_time FROM article JOIN category ON category.category_id=article.category_id ORDER BY create_date DESC LIMIT ? OFFSET ? ";
    pool.query(sql,[pagesize,offset],function(error,results){
        console.log(pagesize,pageindex,offset,error)
        res.json({
            status: true,
            data:results
        })
    })
})

//获取指定分类瞎的文章列表  分页: pagesize一页几篇 pageindex第几页
router.get("/article/byCategory",function(req,res){
    var pagesize=parseInt(req.query.pagesize);
    var pageindex=parseInt(req.query.pageindex);
    var offset=parseInt(pagesize*(pageindex-1));
    var sql="SELECT *,DATE_FORMAT(create_date,'%Y-%m-%d %T') AS create_time,DATE_FORMAT(update_date,'%Y-%m-%d %T') AS update_time FROM article ORDER BY create_date DESC where category_id=? LIMIT ? OFFSET ?";
    pool.query(sql,[req.query.category_id,pagesize,offset],function(error,results){
        res.json({
            status: true,
            data:results
        })
    })
})
module.exports = router;   