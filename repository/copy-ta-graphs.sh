dir=pandemaniac-graphui/private/uploads
cp -r ta/submissions/* ${dir}

find ${dir} -type d -exec chmod 770 {} +
find ${dir} -type f -exec chmod 660 {} +
