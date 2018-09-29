
/*I am unsuer whether this is the best way to do this,
I may change this class to be a set of props that gets passed around
and will inform if this is the case */

export default class User{
    FirstName;
    LastName;
    Email;
    UserID;
    constructor(First, Last, Email, ID){
        FirstName=First;
        LastName=Last;
        This.Email=Email;
        UserID=ID;
    }

    setFirstName(name){
        FirstName=name;
    }

    getFirstName(){
        return FirstName;
    }

    setLastName(name){
        LastName=name;
    }

    getLastName(){
        return LastName;
    }

    setEmail(Email){
        this.Email=Email;
    }

    getEmail(){
        return Email;
    }

    setUserID(ID){
        UserID=ID;
    }

    getUserID(){
        return UserID;
    }

}