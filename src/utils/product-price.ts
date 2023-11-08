export function CalculateProductPrice(costPrice:number): number {
    let rawvalue:number = Math.ceil(costPrice*1.35);
    return Math.round(rawvalue / 10) * 10;
}