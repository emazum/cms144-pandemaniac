redis-server redis.conf &
echo $! > redis-server.pid

mongod --config mongodb.conf &
echo $! > mongod.pid

# Need to change directories so that relative path is correct
cd pandemaniac-graphui
NODE_ENV=production node app.js &
#NODE_DEBUG=cluster,net,http,fs,tls,timers node app.js &
cd ../
echo $! > node.pid
