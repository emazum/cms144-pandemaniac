rm -f pandemaniac-graphui/private/runs/*
mkdir pandemaniac-graphui/public/download/
find pandemaniac-graphui/private/uploads -mindepth 1 -maxdepth 1 -type d \
				         -exec rm -rf '{}' +

source copy-ta-graphs.sh

mongo localhost:27017/test --eval "db.teams.drop()"
mongo localhost:27017/test --eval "db.attempts.drop()"
mongo localhost:27017/test --eval "db.runs.drop()"
mongo localhost:27017/test pandemaniac-graphui/setup/setup-graphs.js
mongo localhost:27017/test pandemaniac-graphui/setup/ensure-indices.js
