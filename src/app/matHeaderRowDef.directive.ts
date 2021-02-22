import { Directive, Input } from "@angular/core";

@Directive({
    selector: '[matHeaderCellDef]'
  }) export class matHeaderCellDef {
    @Input() matHeaderCellDef: string[];
  }