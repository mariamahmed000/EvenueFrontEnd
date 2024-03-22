export class User{
  constructor(
    public email:string,
    public id:string,
    public role:string,
    private _token:string,
    // private _tokenExpirationDate:Date,
  ){}
  get token(){
    // if(!this._token||new Date()>this._tokenExpirationDate){
    //   return null
    // }
    return this._token
  }
  get userRole(){

    return this.role
  }

}

