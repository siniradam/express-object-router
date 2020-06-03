const express = require('express');
const server = express();
const routeMap = require("./route.js")
const expressRouter = require("./eoroute.js")
let port = 8080;
new expressRouter(server, routeMap);

//Start Server
server.listen(port, () => console.log(`Express Server running on http://localhost:${port}`))
