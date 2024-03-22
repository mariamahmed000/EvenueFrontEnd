import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPrice',
  standalone: true
})
export class SearchByPricePipe implements PipeTransform {

  // transform(list: any[], term: string): any[] {
  //   // console.log('here');
  //   // console.log(list);
  //   console.log("term", term);

  // console.log("reasult", list.filter(
  //   (elem => elem &&
  //     elem.tickets.forEach(
  //       ((ele: any) => ele && ele?.price.toString().includes(term))
  //     )
  //   )));
  // console.log(

  //   ele?.price.toString().includes(term)
  // );
  // ele?.price.toString().includes(term);
  // if (ele.price.toString().includes(term)) {
  //   console.log("elllllllllle", ele);
  // }
  //   })
  // )));

  // return list.filter(
  //   (elem => elem &&
  //     elem.tickets.filter((ele: any) => {
  //       console.log("ele", ele.price);

  //       console.log(

  //         ele?.price.toString().includes(term)
  //       );
  //       ele?.price.toString().includes(term);
  //       // if (ele.price.toString().includes(term)) {
  //       //   console.log("elllllllllle", ele);
  //       // }
  //     })
  //   ));

  transform(list: any[], term: string): any[] {

    console.log('ByPrice');
    console.log(term);
    console.log(list);

    const filteredList: any[] = [];

    list.forEach(event => {
      // if (event.tickets?.some((ticket: any) => ticket?.price.toString().includes(term))) {
      //   filteredList.push({ ...event }); // Create a shallow copy of the event and add to filtered list
      // }
      const minPrice = this.getMinPrice(event.tickets);
      if (minPrice !== null && minPrice.toString().includes(term)) {
        filteredList.push({ ...event });
      }
    });

    return filteredList;
  }

  private getMinPrice(tickets: any[]): number | null {
    if (!tickets || tickets.length === 0) {
      return null;
    }

    let minPrice = tickets[0].price;

    for (let i = 1; i < tickets.length; i++) {
      if (tickets[i].price < minPrice) {
        minPrice = tickets[i].price;
      }
    }

    return minPrice;
  }
}
