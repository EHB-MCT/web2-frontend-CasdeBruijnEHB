const path = require('path');

module.exports = {
    entry: {
        loader: './src/loader.js',
        generator: './src/playlistGenerator.js',
        playlistlibrary: './src/playlistLibrary.js',
        apiCall: './src/apiCall.js',
        adminpage: './src/adminpage.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development'
};