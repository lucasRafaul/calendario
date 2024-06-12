const jwt = require ('jsonwebtoken');
config = require ('../config.js');

const secret = config.jwt.secret; 

function asignarToken(data){
    return jwt.sign(data, secret);//token
}

module.exports = {
    asignarToken 
}