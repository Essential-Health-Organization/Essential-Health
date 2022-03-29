const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async(req,res,next)=>{// to create a middleware we did this
    //before it even hits the routes its going to request access and then 
    //response then if its working ok were going to keep going.
    try {

        const jwtToken = req.header("token");
        if(!jwtToken){
            return res.status(401).json("Not Authorized")
        }
        //if this is verified it will return the payload that we can use in our routes
         const payload = jwt.verify(jwtToken,process.env.jwtSecret)
         req.user = payload.user
         next();
    } catch (err) {
        console.error(err.message)
        return res.status(403).json("Not Authorized")
    }
}
