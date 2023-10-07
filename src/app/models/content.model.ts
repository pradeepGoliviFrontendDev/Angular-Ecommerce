import { Category } from "./category.model";
import { Customer } from "./customer.model";
import { Review } from "./review.model";

export class Content {
    public productId: number;
    public imagePath = [];
    public mainImg : string;
    public productName:string;
    public price: number;
    public dimension: string;
    public specification:string;
    public manufacturer:string;
    public quantity:number;
    public categoryName: string;
    public discountPercentage : number;
    public inDeliveryDays : number;
    public adminDetails : Customer;
    public aboutItem = []
    public review : Review [] = []
}