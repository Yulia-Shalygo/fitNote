import { Directive, Input } from "@angular/core";

@Directive({
    selector: '[matRowDef]'
  }) export class StubMatRowDefDirective {
    @Input() matRowDefColumns: string[];
  }