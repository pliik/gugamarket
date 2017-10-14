echo "";
echo "DEVELOPERS DIRECT ACCESS TO SERVER IS DEPRECATED!";
echo "-------------------------------------------------";
echo "Please use a webserver to access Dashboard";
echo "-------------------------------------------------";
echo "Use Nginx server for client access.";
echo "(see ./nginx/nginx.conf)";
echo "-------------------------------------------------";

mkdir \data\db
setx -m NODE_ENV "development"
START mongod
sleep 3
START supervisor app.js
