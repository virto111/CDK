import { DialogRef } from './../dialog/dialog/dialog-ref';
import { Component, OnInit } from '@angular/core';
import { DialogConfig } from '../dialog/dialog/dialog-config';

@Component({
  selector: 'app-injected-child',
  templateUrl: './injected-child.component.html',
  styleUrls: ['./injected-child.component.scss']
})
export class InjectedChildComponent implements OnInit {

  constructor(
    public config: DialogConfig,
    public dialog: DialogRef,
  ) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialog.close('some value');
  }
}
