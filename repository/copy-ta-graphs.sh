dir=pandemaniac-graphui/private/uploads
cp -r ta-graphs/* ${dir}

find ${dir} -type d -exec chmod 770 {} +
find ${dir} -type f -exec chmod 660 {} +
