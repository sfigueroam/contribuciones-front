import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leadingZero'
})
export class LeadingZeroPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let zero = args - value.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + value;
  }

}
