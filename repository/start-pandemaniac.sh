mkdir logs
mkdir -p data/db
mkdir -p pandemaniac-graphui/private/runs
mkdir -p pandemaniac-graphui/private/uploads
mkdir -p pandemaniac-graphui/public/download

redis-server redis.conf &
echo $! > redis-server.pid

mongod --config mongodb.conf &
echo $! > mongod.pid

# Need to change directories so that relative path is correct
cd pandemaniac-graphui
NODE_ENV=production node app.js &

cd ../
echo $! > node.pid
