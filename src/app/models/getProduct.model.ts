import { Category } from "./category.model";

export class GetProduct{
    public productId: number;
    public imagePath:string;
    public productName:string;
    public price: number;
    public dimension: string;
    public specification:string;
    public manufacturer:string;
    public quantity:string;
    public category: Category;
}