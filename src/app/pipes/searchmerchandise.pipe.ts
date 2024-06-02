import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchmerchandise'
})
export class SearchmerchandisePipe implements PipeTransform {

  transform(items: any[], searchText: string, properties: string[]): any[] {
    if (!items) return [];
    if (!searchText) return items;
 
    searchText = searchText.toLowerCase();
 
    return items.filter(item => {
      return properties.some(property => {
        if (item[property]) {
          return item[property].toLowerCase().includes(searchText);
        }
        return false;
      });
    });
  }

}
