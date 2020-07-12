class eoroute{
    constructor(express, server, routemap, middleware){
        this.express = express;
        this.server = server;
        this.routemap = routemap;
        this.lastProcessed = "/";

        if(typeof middleware == "function"){
            this.middleware = middleware
        }

        this.routeStaticFiles()
        this.routemapControl()

        this.http = {
            route:(req,res)=>{
                let url = req.originalUrl
                let path = url.split("/")
    
                path[path.length - 1] = path[path.length - 1].split("?")[0]

                this.routemap.defaults.headers(req,res);
                if(typeof this.routemap.defaults.defaultCallback == "function"){
                    this.routemap.defaults.defaultCallback(req, res, path);
                }

                if (path.length <= 1) {
                    res.status(this.routemap.defaults.notfound);
                    this.routemap.pages.notfound(req, res);
                    return;
                }else{
                    path.shift();
                    this.http.pathFinder(path, this.routemap.pages, this.routemap.pages.notfound)(req,res)
                }
            },

            pathFinder:(path, route, notfoundCallback)=>{
                path = path.filter(function (item) {return (item)});
                this.lastProcessed = path;

                let totalLevel = path.length;
            
                if(totalLevel==1){
                    if(typeof route[path[0]] === 'function'){
                        return route[path[0]];
                    }else{
                        if(route[path[0]]){
                            if(typeof route[path[0]].default === "function"){
                                return route[path[0]].default;
                            }else{
                                return (typeof notfoundCallback === "function")? notfoundCallback:console.log;
                            }
                        }else{
                            return (typeof notfoundCallback === "function")? notfoundCallback:console.log;
                        }
                    }
                }else{
                    let L = path.shift();
                    return this.http.pathFinder(path,route[L],notfoundCallback)
                }
            },



        }

        if(this.middleware){
            this.server.use(this.middleware)
        }

        //Set Route
        this.server.get("/", this.routemap.pages.homepage)
        this.server.get(/.*/, this.http.route)//Handle Get Requests
        this.server.post(/.*/, this.http.route)//Handle Post Requests

        this.server.use((req, res, next) => {
            this.routemap.defaults.headers(req,res);
            res.status(404).send("404")
        })
    }


    routeStaticFiles(){

        if(this.routemap && this.routemap.publicFolder){
            if(typeof this.routemap.publicFolder=="string" && this.routemap.publicFolder.length>0){
                this.server.use(this.express.static(this.routemap.publicFolder))
            }
        }
    }


    routemapControl(){
        if(typeof this.routemap.defaults != "object"){
            throw "Route defaults not defined."
        }

        if(typeof this.routemap.defaults.headers != "function"){
            throw "Default Headers Are not Defined."
        }

        if(typeof this.routemap.pages != "object"){
            throw "Pages are not defined.."
        }
    }
}

module.exports = eoroute;