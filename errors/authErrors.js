
export {ErrorLogin, ErrorRegister}

class ErrorLogin extends Error{
    constructor(message){
        super(message),
        this.name = "ErrorLogin",
        this.satus = 401
    }
}

class ErrorRegister extends Error{
    constructor(message){
        super(message),
        this.name = "ErrorRegister",
        this.satus = 401
    }
}