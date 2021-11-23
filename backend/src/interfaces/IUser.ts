export interface IUser{
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    birth: string;
}

export interface IUserInPutDTO{ //post할때 받는거 !!
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    birth: string;
}

export interface userUniqueSearchInput {
    email : string;
    password : string;
}