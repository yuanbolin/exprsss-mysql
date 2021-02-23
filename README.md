#express-mysql

##使用条件
Mysql+Navicat+Postman

Mysql安装与使用(docker)
参照以下网址安装mysql
https://www.runoob.com/docker/docker-install-mysql.html

# docker 中下载 mysql
docker pull mysql

#启动
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=Lzslov123! -d mysql

#进入容器
docker exec -it mysql bash

#登录mysql
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Lzslov123!';

#添加远程登录用户
CREATE USER 'yuanbolin'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'yuanbolin'@'%';
