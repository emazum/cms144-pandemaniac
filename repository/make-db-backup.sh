dir=db-backups/$(date +%s)
mkdir -p ${dir}

mongodump --host localhost:27017 -d pandemaniac -o ${dir}
