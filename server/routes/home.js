const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization")


//auth by passing threw we are able to access the request id user object to the 
//users id information 
//
router.get("/",authorization,async(req,res)=>{
    try {
        //req.user has the payload
        // res.json(req.user)
        const user = await pool.query("SELECT * FROM login_credentials WHERE user_id = $1",[req.user])
        res.json(user.rows[0])
        
    } catch (err) {
        console.error(err.message)
        res.status(500).json("server err")
    }
})


module.exports = router
