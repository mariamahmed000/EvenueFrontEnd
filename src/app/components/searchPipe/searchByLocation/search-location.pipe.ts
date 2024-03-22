import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchLocation',
  standalone: true
})
export class SearchLocationPipe implements PipeTransform {

  transform(list: any[], term: string): any[] {
    console.log('Bylocation');
    console.log(term);
    console.log(list);
    console.log("-------------------------------------------");
    
    
    const filteredList: any[] = [];
    list.forEach(event => {
      if (event.location?.toLowerCase().includes(term.toLowerCase())) {
        filteredList.push({ ...event }); // Create a shallow copy of the event and add to filtered list
      }
    });
    console.log("filteredList", filteredList);

    return filteredList;
    // return list.filter(
    //   (elem => elem && elem.location?.toLowerCase().includes(term.toLowerCase()))
    // );

  }
}
