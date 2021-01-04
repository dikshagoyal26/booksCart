import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderFilter',
})
export class OrderFilterPipe implements PipeTransform {
  transform(value: any, filter?: string): unknown {
    if (!value) return null;
    if (!filter) return value;
    return value.filter((val) => {
      console.log(val);
      let rval =
        val._id.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        val.created_at
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase()) ||
        ('' + val.total)
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase());
      return rval;
    });
  }
}
