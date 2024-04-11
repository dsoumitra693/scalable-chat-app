export interface IUser {
    name:string;
    phone: string;
    jwts:[
        jwt: string,
    ];
    avater:string;
    password:string;
}