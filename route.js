module.exports = {

    defaults:{
        headers:(req,res)=>{//Required
            //Will be called before routing.
            res.setHeader('X-Powered-By', 'OhShift Web Server');
        },

        notfound:404, //Required

        defaultCallback:(req,res,processedPath)=>{
            //Optional, will be called before each routing with processed path value.
            console.log(`processedPath ${processedPath}`)
        }
    },

    pages: {
        homepage:(req,res)=>{
            //Default Landing Page

            let pageHeader = `<center style="font-family:arial"><h1>OhShift</h1></center>`
            let pageFooter = ""
            res.send(`${pageHeader} Hello This is home page. ${pageLinks()}${pageFooter}`)
        },            
    
        notfound:(req, res)=>{
            //Default 404 Page.
            res.send(`This is 404 Page ${pageLinks()}`);
        },
    
        level1:{
            //Example root page
            default:(req, res)=>{//Default Page of the object/
                res.send(`Level 1 Default Page ${pageLinks()}`)
            },

            level2:(req,res)=>{
                //Level2 page is a child of level1.
                res.send(`Level2 Page ${pageLinks()}`)
            },

            "test.html":(req, res)=>{
                //Level2 Test.html page is a child of level1.
                res.send(`Test.html ${pageLinks()}`)
            }
            
        }
    },


    publicFolder:"public"
}

let pageLinks = () => {//Demo Content
    let html= "<br>"
    html+= '<a href="/">Home Page</a><br>'
    html+= '<a href="/level1">Level 1 Page</a><br>'
    html+= '<a href="/level1/level2">Level 2 Page</a><br>'
    html+= '<a href="/level1/test.html">Level 2 Page Test.HTML</a><br>'

    return html;
}