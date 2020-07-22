import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { InsertionDirective } from './dialog/insertion.directive';



@NgModule({
  declarations: [
    DialogComponent,
    InsertionDirective
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    DialogComponent,
  ],
})
export class DialogModule { }
