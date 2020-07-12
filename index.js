const express = require('express');
const server = express();
const routeMap = require("./route.js")
const expressRouter = require("./eoroute.js")
let port = 8080;

function middleware(req,res,next){
    //Your middleware code

    //Next In Order
    next();
}

new expressRouter(express, server, routeMap, middleware);

//Start Server
server.listen(port, () => console.log(`Express Server running on http://localhost:${port}`))
