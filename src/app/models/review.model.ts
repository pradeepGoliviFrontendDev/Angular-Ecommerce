import { Customer } from "./customer.model";

export class Review {
    public reviewId : number;
	public rating : number;
    public headline : string;
    public reviewMessage : String;
    public countHelpful : {
        id : number,
        count : number,
        customers : Customer[]
    }
    public customer : Customer;
    public reviewDate : Date;

}