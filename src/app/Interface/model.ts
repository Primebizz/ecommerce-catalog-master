export interface IModel {
    id: number,
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