import { DialogModule } from './dialog/dialog.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InjectedChildComponent } from './injected-child/injected-child.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DialogModule,
  ],
  entryComponents: [
    InjectedChildComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
