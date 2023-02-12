var crypt = require('crypto'); 
export class User{
    protected hashedPassword : string | undefined
    protected passwordSalt : string | undefined
    private passwordDate : Date | undefined

    private _username!: string
    public get username(): string {
        return this._username
    }
    public set username(value: string) {
        this._username = value
    }

    private _email!: string
    public get email(): string {
        return this._email
    }
    public set email(value: string) {
        this._email = value
    }

    private _password!: string
    public get password(): string {
        return this._password
    }
    public set password(value: string) {
        this._password = value
    }

    // Constructor with default values
    constructor(username : string, email : string, password : string){
        this.username = username
        this.email = email
        this.password = password
        this.setPassword(password)
    }

    private setPassword(password : string){
        this.passwordSalt = crypt.randomBytes(16).toString('hex');
        this.hashedPassword = crypt.pbkdf2Sync(password, this.passwordSalt, 1000, 64, `sha512`).toString(`hex`);
        this.passwordDate = new Date()
    }

}