var crypt = require('crypto');

function checkHash(password, salt, hash){
    var temphash = crypt.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`); 
    return hash === temphash; 
}

module.exports = { checkHash };
