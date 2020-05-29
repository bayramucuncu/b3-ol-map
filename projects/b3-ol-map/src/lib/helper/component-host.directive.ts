import { Directive, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[componentHost]'
})
export class ComponentHostDirective {

  @Input() componentData: any;

  constructor(public viewContainerRef: ViewContainerRef) {

  }

}
