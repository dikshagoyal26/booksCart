import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filter?: string): unknown {
    if (!value) return null;
    if (!filter) return value;
    return value.filter((val) => {
      let rval =
        val.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        val.author.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        val.category.category_type
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase()) ||
        ('' + val.price)
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase());
      return rval;
    });
  }
}
