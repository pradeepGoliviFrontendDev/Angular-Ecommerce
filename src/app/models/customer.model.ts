import { Address } from "./address.model";

export class Customer {
   customerId : number;
   dateOfCreation: Date;
   email : string;
   mobileNumber : string;
   password : string;
   username : string;
   address : Address;
   role : string;
  
}