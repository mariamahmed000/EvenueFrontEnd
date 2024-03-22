import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(list: any[], term: string): any[] {
    return list.filter(
      (elem => elem && elem.title?.toLowerCase().includes(term.toLowerCase()))
    );
  }
}
