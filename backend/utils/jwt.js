//Imports
const jwt = require("jsonwebtoken")

//
exports.tokenUser = (user) => {
    return jwt.sign({
        userId: user.id,
        isAdmin: user.isAdmin,        
    }, 
    "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h"
    })
}