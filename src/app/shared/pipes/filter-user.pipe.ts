import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteruser'
})
export class FilterUserPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }

    searchText = searchText.toLowerCase();
    return items.filter(it => {
      const search = it.name + ' ' + it.surname;
      return search.toLowerCase().includes(searchText);
    });
  }
}
