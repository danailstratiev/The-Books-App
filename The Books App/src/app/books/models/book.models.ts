export interface IBook{
  id:string, 
  volumeInfo:IVolumeInfo,
  saleInfo?:any,
  accessInfo?:any
}


export interface IVolumeInfo{
  title:string, 
  authors:string[], 
  publisher:string, 
  publishedDate:string, 
  pageCount:number,
  imageLinks:any,
  saleability?:string
  categories?:string[],
  averageRating?:number,
}