const config = {
    'retainLines': true,
    'plugins': [
    ],
    include: [/node_modules/],
    exclude: [],
    ignore: [filename => {
        //console.log({ filename })
        if (
            // if not in node_modules, we want to compile it
            (!/\/node_modules\//.test(filename)) ||
            // its our source code, so we want to compile it
            (/\/node_modules\/@my-namespace\//.test(filename))
        ) {
            return false
        }
        // it's in node modules and NOT our source code
        return true
    }]
}

module.exports = config
