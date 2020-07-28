import { Component, OnInit, TemplateRef, Type } from '@angular/core';
import { MyOverlayRef } from '../myoverlay-ref';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styles: ['']
})
export class OverlayComponent implements OnInit { // ! Това е динамично създаден компонент. Създаден е в OverlayService-a
  contentType: 'template' | 'string' | 'component';
  content: string | TemplateRef<any> | Type<any>;
  context;

  // * тук инжектираме [OverlayComponent] със OverlayRef компонента
  // * инжекцията става при динамичното му създаване в OverlayService-a
  constructor(private ref: MyOverlayRef) {}

  close() {
    // console.log('Value ::: ', value);
    this.ref.close(null);
  }

  ngOnInit() {
    this.content = this.ref.content;

    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        close: this.ref.close.bind(this.ref)
      };
    } else {
      this.contentType = 'component';
    }
  }
}
