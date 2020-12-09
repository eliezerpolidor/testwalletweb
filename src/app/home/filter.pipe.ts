import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText1?:string, filter1?:string, searchText2?:string, filter2?:string): any[] {
    if(!items) return [];
		return items.filter( (it:any) =>  this.checkWalletIdItem(it,searchText1,filter1) && this.checkPriceItem(it,searchText2,filter2));
   }

   checkWalletIdItem(item:any, searchText:string, filter:string) {
      switch(filter) {
        case ">=" : {
          return  (searchText == "" || !isNaN(parseInt(searchText)) && item.anyId >= parseInt(searchText));
        }
        case "<=" : {
          return  searchText == "" || !isNaN(parseInt(searchText)) && item.anyId <= parseInt(searchText);
        }
        default : {
          return searchText == "" || item.anyId.toString().includes(searchText);
        }
      }
    }

    checkPriceItem(item:any, searchText:string, filter:string) {
      switch(filter) {
        case ">=" : {
          return (searchText == "" || !isNaN(parseInt(searchText)) && item.anyPrice >= parseInt(searchText));
        }
        case "<=" : {
          return searchText == "" || !isNaN(parseInt(searchText)) && item.anyPrice <= parseInt(searchText);
        }
        default : {
          return searchText == "" || item.anyPrice.toString().includes(searchText);
        }
      }
    }

}



