#!/usr/bin/bash

[ -s "/.nvm/nvm.sh" ] && \. "/.nvm/nvm.sh"
cd /var/www/mylms-frontend

npm install -g serve
serve -s build

nohup npm start > /dev/null 2>&1 &