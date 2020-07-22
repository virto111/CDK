import { InjectedChildComponent } from './injected-child/injected-child.component';
import { DialogService } from './dialog/dialog.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public dialogService: DialogService
  ) {
    this.dialogService.open(InjectedChildComponent, {
      data: {
        message: 'I am dynamic component inside of a dialog!'
      }
    });
  }
}
