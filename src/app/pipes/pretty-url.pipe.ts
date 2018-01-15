import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyUrl'
})
export class PrettyUrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const matches = value.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
      const domain = matches && matches[1];
      return domain;
    }
  }

}
