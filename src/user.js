"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var crypt = require('crypto');
class User {
    // Constructor with default values
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.setPassword(password);
    }
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    setPassword(password) {
        this.passwordSalt = crypt.randomBytes(16).toString('hex');
        this.hashedPassword = crypt.pbkdf2Sync(password, this.passwordSalt, 1000, 64, `sha512`).toString(`hex`);
        this.passwordDate = new Date();
    }
}
exports.User = User;
