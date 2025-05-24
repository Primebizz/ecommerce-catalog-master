export interface IModel {
    _id: string,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    category: string,
    stock: boolean
}


export class Model {
    // id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    stock: boolean


    constructor(){
    // this.id = 0;
    this.name = '';
    this.description = '';
    this.price = 0;
    this.imageUrl = '';
    this.category = '';
    this.stock = false;

    }
}

export class User{
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    password: string;
    addresses: [];
    role: string


    constructor(){
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = 0;
    this.password = '';
    this.addresses = [];
    this.role = '';

    }
}

export interface IUser{
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    password: string;
    addresses: [];
    role: string

}

export class ApiResponse{
    status: boolean;
    message: string;
    data: any;
    token: string;
    user: User

    constructor(){
    this.status = false;
    this.message = '';
    this.data = null;
    this.token = '';
    this.user = new User();
    }
}