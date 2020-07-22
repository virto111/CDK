import { DialogInjector } from './dialog/dialog.injector';
import { DialogModule } from './dialog.module';
import { Injectable, ComponentRef, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, Type } from '@angular/core';

import { DialogRef } from './dialog/dialog-ref';
import { DialogComponent } from './dialog/dialog.component';
import { DialogConfig } from './dialog/dialog-config';

@Injectable({
  providedIn: DialogModule,
})
export class DialogService {
  dialogComponetRef: ComponentRef<DialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) { }

  private appendDialogComponentToBody(config: DialogConfig): DialogRef {
    // -1- Create Map with the config
    const map = new WeakMap();
    map.set(DialogConfig, config);

    // add the DialogRef to dependency injection
    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);

    // We want to know when somebody called the close method
    const sub = dialogRef.afterClosed$.subscribe(() => {
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });

    // Dynamically instantiating the dialog componnet using its factory
    const componentFactory = this.componentFactoryResolver
                             .resolveComponentFactory(DialogComponent);
    // Once we have the Factory, we can use it to create an instance

    // We are passing the injector and thus the dynamically creates
    // componenet make use of the DI itself
    // const componentRef = componentFactory.create(this.injector);
    const componentRef = componentFactory.create(new DialogInjector(this.injector, map));
    // We have to attach newly created component to Angular View Treer !== DOM!
    this.appRef.attachView(componentRef.hostView);

    const domElement = (componentRef.hostView as EmbeddedViewRef<any>)
                       .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);

    this.dialogComponetRef = componentRef;

    // Return the Dialog Ref
    return dialogRef;
  }

  private removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.dialogComponetRef.hostView);
    this.dialogComponetRef.destroy();
  }

  public open(injectedComponent: Type<any>, config: DialogConfig): void {
    this.appendDialogComponentToBody(config);
    // Injecting other components into our dialog
    this.dialogComponetRef.instance.childComponentType = injectedComponent;
    // we will create yet again dynamic component
    // BUT we will not import it in the DOM
    // We have to tell angular where to place it
    // So we need to create a custom directive
  }
}
