const server = require('./api/server');
require('dotenv').config();
const {serverPort} = require('./config/port');

const port = serverPort;

server.listen(port, () => {
    console.log(`Api running on port ${port}`)
});

