export interface IFutsal{
    id:number;
    name:string;
    image:string;
    address:string;
    city:string;
    pricePerHour:number;
    amenities:string[];
    distance:number,
    latitude?:number,
    longitude?:number
    // time_slots:any[]
}