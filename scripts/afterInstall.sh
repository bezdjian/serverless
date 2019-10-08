#!/usr/bin/bash

[ -s "/.nvm/nvm.sh" ] && \. "/.nvm/nvm.sh"
cd /home/ec2-user/

npm install -g serve
serve -s build

nohup npm start > /dev/null 2>&1 &