import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnit]',
})
export class UnitDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
