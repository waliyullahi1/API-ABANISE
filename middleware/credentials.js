const allowOrigins = "../config/allowOrigins";

const credentials = (req, res, next) =>{
     const origin = req.headers.origin;
    if (allowOrigins.indexOf(origin)) {
     res.header('Access-Control-Allow-Credientials', true);
    } 

    next();

}

module.exports = credentials;