import { Directive, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[widgetHost]'
})
export class WidgetHostDirective {

  @Input() widgetData: any;

  constructor(public viewContainerRef: ViewContainerRef) {

  }

}
