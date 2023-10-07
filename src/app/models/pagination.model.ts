import { Content } from "./content.model";
import { Pageable } from "./pageable.model";
import { Sort } from "./sort.model";

export class Pagination{
    content : any = [];
    pageable : Pageable;
    last : boolean;
    totalElements : number;
    totalPages : number = 10;
    size : number;
    number : number;
    sort: Sort;
    first : boolean;
    numberOfElements: number;
    empty: boolean;

}