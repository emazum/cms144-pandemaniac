dir=db-backups/$(date +%s)
mkdir -p ${dir}

#mongodump --host localhost:3000 -d test -o ${dir}
mongodump --host localhost:27017 -d test -o ${dir}

find ${dir} -exec chgrp cs144 {} +
find ${dir} -type d -exec chmod 770 {} +
find ${dir} -type f -exec chmod 660 {} +
