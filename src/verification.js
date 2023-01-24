const jwt = require('jsonwebtoken')


const authorization =  (request, response, next) =>{
    const token = request.header('Authorization');
    if(!token) return response.status(401).json("Access Denied");

    try{
        const verified = jwt.verify(token, "kennethisboss");
        request.user = verified;
        next();
    }catch(error){
        response.status(400).json('Invalid token')
    }

}


module.exports = {
    authorization
}

