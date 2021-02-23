#express-mysql

##使用条件
Mysql+Navicat+Postman

Mysql安装与使用(docker)
参照以下网址安装mysql
https://www.runoob.com/docker/docker-install-mysql.html

# docker 中下载 mysql
docker pull mysql

#启动
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql

#进入容器
docker exec -it mysql bash

#登录mysql
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';

#添加远程登录用户
CREATE USER 'yuanbolin'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'yuanbolin'@'%';

##视频地址
链接：https://pan.baidu.com/s/19pZmJl9gG1eXXMSqDZg7Ag 
提取码：cu5s 
复制这段内容后打开百度网盘手机App，操作更方便哦

##Navicat破解版
链接：https://pan.baidu.com/s/1DQAaWSYXrM6N1rMYQyOXyA 
提取码：8otq 
复制这段内容后打开百度网盘手机App，操作更方便哦
