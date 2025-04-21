#!/bin/sh
if [ "$1" = "build" ];then
    mkdir /home/changsheng/project/project53183/project
    cp -a /home/changsheng/project/project53183/server/. /home/changsheng/project/project53183/project/
    cd /home/changsheng/project/project53183/project
    rm -rf /home/changsheng/project/project53183/server
    echo "执行成功"
fi
