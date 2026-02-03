rm -rf pandemaniac-graphui/private/runs
mkdir pandemaniac-graphui/private/runs
rm -rf pandemaniac-graphui/private/uploads
mkdir pandemaniac-graphui/private/uploads
rm -f pandemaniac-graphui/public/download/*

dir=pandemaniac-graphui/private/uploads
cp -r ta/submissions/* ${dir}

find ${dir} -type d -exec chmod 770 {} +
find ${dir} -type f -exec chmod 660 {} +


mongosh localhost:27017/pandemaniac pandemaniac-graphui/setup/full-setup.js
