import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'saleFactor'})

export class SaleFactorPipe implements PipeTransform {
  transform(value: any): any {
      if (value?.saleability === 'FOR_SALE') {
          return value?.listPrice?.amount + value?.retailPrice?.currencyCode;
      }else if (value?.saleability == 'NOT_FOR_SALE') {
          return 'Not for sale'
      }else{
          return 'Free'
      }
  }
}