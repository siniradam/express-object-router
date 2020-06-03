module.exports = {

    defaults:{
        headers:(req,res)=>{//Required
            res.setHeader('X-Powered-By', 'OhShift Web Server');
        },

        notfound:404, //Required

        defaultCallback:(req,res,processedPath)=>{
            console.log(`processedPath ${processedPath}`)
        }
    },

    pages: {
        homepage:(req,res)=>{
            let pageHeader = `<center style="font-family:arial"><h1>OhShift</h1></center>`
            let pageFooter = ""
            res.send(`${pageHeader} Hello This is home page. ${pageLinks()}${pageFooter}`)
        },            
    
        notfound:(req, res)=>{
            res.send(`This is 404 Page ${pageLinks()}`);
        },
    
        level1:{
            default:(req, res)=>{
                res.send(`Level 1 Default Page ${pageLinks()}`)
            },
            level2:(req,res)=>{
                res.send(`Level2 Page ${pageLinks()}`)

            }
            
        }
    }
}

let pageLinks = () => {
    let html= "<br>"
    html+= '<a href="/">Home Page</a><br>'
    html+= '<a href="/level1">Level 1 Page</a><br>'
    html+= '<a href="/level1/level2">Level 2 Page</a><br>'

    return html;
}