 const jwt = require("jsonwebtoken");
 const jwtSecret = "IshanisKingOfGoodTimes";

const fetchUser = (req, res, next) => {

    // Get user from JWT and add id to request object
    const token = req.header("auth-token");
    if(!token){
        return res.status(401).send({error : "Please authenticate using a valid token"});
    } 
    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user; 
        next();
        
    } catch (error) {
        return res.status(401).send({error : "Please authenticate using a valid token"})
    }
    
}

 module.exports = fetchUser ;