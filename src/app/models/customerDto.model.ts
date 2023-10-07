import { Address } from "./address.model";

export class CustomerDto{
    username : string;
    password : string;
    mobileNumber: string;
    email : string;
    dateOfCreation: Date;
    customerId: number;
    address : Address
}