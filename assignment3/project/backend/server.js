const express = require('express');
const cors = require('cors');
const path = require('path');

const server = express();
server.use(cors())
server.use(express.json());
server.use(express.static(path.resolve(__dirname,'./build')));

const routes = require('./api_routes/routes');
routes(server);
const port =  8080;

server.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname,'./build','index.html'))
});
server.listen(port, '0.0.0.0',() => {
    console.log(`Listening to port ${port}`);
});