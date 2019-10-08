#!/usr/bin/bash

#npm install -g serve
#serve -s build

[ -s "/.nvm/nvm.sh" ] && \. "/.nvm/nvm.sh"
cd /home/ec2-user/
nohup npm start > /dev/null 2>&1 &