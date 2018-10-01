export default class User {
    username;
    pass;
    email;
    DOB;
    phone;

    constructor (username, pass, email, DOB, phone) {
        this.username = username;
        this.pass = pass;
        this.email = email;
        this.DOB = DOB;
        this.phone = phone;
    }
}
