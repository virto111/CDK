import { 
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Type,
  ComponentRef,
  ViewChild,
  ComponentFactoryResolver,
  ChangeDetectorRef
} from '@angular/core';
import { InsertionDirective } from './insertion.directive';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit, OnDestroy {

  private readonly _onClose = new Subject<any>();

  public injectedComponentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  public onClose = this._onClose.asObservable();

  @ViewChild(InsertionDirective)
  insertionPoint: InsertionDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cdr.detectChanges();
  }
  ngOnDestroy(): void {
    if (this.injectedComponentRef) {
      this.injectedComponentRef.destroy();
    }
  }

  loadChildComponent(injectedComponentType: Type<any>): void {
    const injectedComponentFactory = this.componentFactoryResolver
                           .resolveComponentFactory(injectedComponentType);
    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();
    this.injectedComponentRef = viewContainerRef.createComponent(injectedComponentFactory);
  }

  onOverlayCliked(event: MouseEvent): void {

  }

  onDialogCliked(event: MouseEvent): void {
    // make sure the event will NOT propagate to the parent Overlay element
    event.stopPropagation();
  }
}
