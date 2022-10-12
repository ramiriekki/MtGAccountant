var crypt = require('crypto');

// Compare the given hash from the data base to a temp hash created from given password and database salt combination
function checkHash(password, salt, hash){
    var temphash = crypt.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`); 
    return hash === temphash; 
}

module.exports = { checkHash };
