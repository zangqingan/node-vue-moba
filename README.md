# node-vue-moba

>一个node+vue全栈开发王者荣耀移动端官网和管理后台

## 一.管理后台 admin
 1. 搭建基于element ui的后台管理基础界面

## 服务器安装（ubuntu）
1. 安装nginx
apt install nginx -y (-y表示自动确认不用手动确认)
2. 安装mongodb
apt install -y mongodb-server
3. 安装git
apt install -y git
配置ssh-key
ssh-keygen
查看公钥
cat /root/.ssh/id_rsa.pub(存放的地址)
4. 安装nodejs和npm
apt install -y nodejs
apt install -y npm

安装nrm用来快速切换下载镜像地址
npm i -g nrm
nrm use taobao
nrm use npm

安装n,用来升级node的版本
npm i -g n
 n latest 使用最新版本

5. 迁移本地数据库数据到服务器上
 mongodump -d node-vue-moba(要导出的数据库名)
 mongorestore 恢复数据库