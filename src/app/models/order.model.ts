import { Address } from "./address.model";
import { CustomerDto } from "./customerDto.model";
import { ProductDto } from "./productDto.model";

export class Orders{
    orderId : number;
    orderDate: Date;
    customer : CustomerDto;
    products : ProductDto [] = [];
    address : Address;
    orderStatus : string;
    totalAmount : number;
    
}