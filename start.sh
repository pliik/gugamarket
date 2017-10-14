#sudo mkdir -p  /data/db/
#sudo chown -R freedomson /data/db/
#sudo mkdir /data/db/journal
#sudo nohup mongod &
export NODE_ENV=development
supervisor app.js 
