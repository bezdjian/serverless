#!/usr/bin/bash
[ -s "/.nvm/nvm.sh" ] && \. "/.nvm/nvm.sh"
cd /home/ec2-user/mylms-frontend

#npm install
npm run build
npm install -g serve
serve -s build

#REACT_APP_SERVICE_URL=http://18.130.215.238:8080 npm start

#nohup npm start > /dev/null 2>&1 &