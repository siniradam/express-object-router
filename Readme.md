[![Solid](https://www.ohshiftlabs.com/assets/images/logo.png)](https://www.ohshiftlabs.com/)

# Express Object Router
This library allows you to manage pages with a simple map object for express servers.


# Updates
- 1.0.1
Middleware function now can be passed.
Static Files folder can be defined in route file.
Simple favicon added to demonstrate static files.

- 1.0.0
Initial features. 
Reading browsing tree (route) object and serving pages.



# Sample
Using EORoute fairly simple just create an express instance and pass as parameter.
```javascript
const express = require('express');
const server = express();
const routeMap = require("./route.js")
const expressRouter = require("./eoroute.js")
let port = 8080;

//Add Middleware Function (Optional)
function middleware(req,res,next){
    //Your middleware code

    //Next In Order
    next();
}

//Initialize Express Router
new expressRouter(express, server, routeMap, middleware);

//Start Server
server.listen(port, () => console.log(`Express Server running on http://localhost:${port}`))
```


# Creating a route file

```javascript
module.exports = {

    defaults:{
        headers:(req,res)=>{//Required
            //Will be called before routing.
            res.setHeader('X-Powered-By', 'OhShift Web Server');
        },

        notfound:404, //Required

        //Optional, will be called before each routing with processed path value.
        defaultCallback:(req,res,processedPath)=>{
            console.log(`processedPath ${processedPath}`)
        }
    },

    //Define your pages here
    pages: {
        //Default Landing Page
        homepage:(req,res)=>{
            res.send(`Hello This is home page.`)
        },            
    
        //Default 404 Page.
        notfound:(req, res)=>{
            res.send(`This is 404 Page}`);
        },
    
        //Example root page
        level1:{
            //Default Page of this path
            default:(req, res)=>{
                res.send(`Level 1 Default Page ${pageLinks()}`)
            },

            //Level2 page is a child of level1. Ex: yourdomain.com/level1/level2
            level2:(req,res)=>{
                res.send(`Level2 Page ${pageLinks()}`)
            },


            //Level2 Test.html page is a child of level1. Ex: yourdomain.com/level1/test.html
            "test.html":(req, res)=>{
                res.send(`Test.html ${pageLinks()}`)
            }
            
        }
    },


    //This folder path will be used for serving static files.
    publicFolder:"public"
}
```