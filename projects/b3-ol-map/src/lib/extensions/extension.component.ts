import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, Type, ComponentRef, AfterContentInit } from '@angular/core';
import { ExtensionAggregator } from './extension-aggregator';
import { ComponentHostDirective } from '../helper/component-host.directive';

@Component({
  selector: 'b3-extension',
  templateUrl: './extension.component.html'
})
export class ExtensionComponent implements OnInit {

  componentRef: ComponentRef<any>;

  @Input() componentData: any;

  @ViewChild(ComponentHostDirective, { static: true }) componentHostDirective: ComponentHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.componentData.settings.component && this.injectComponent();
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

  private injectComponent() {
    try {
      const componentFactory = this.getComponentFactory(this.componentData.settings.component, this.componentFactoryResolver);

      const viewContainerRef = this.componentHostDirective.viewContainerRef;
      viewContainerRef.clear();

      this.componentRef = viewContainerRef.createComponent(componentFactory);
      (<ExtensionAggregator>this.componentRef.instance).componentData = this.componentData;
      
      this.componentRef.changeDetectorRef.detectChanges();
      
    } catch (error) {
      console.error(error)
    }
  }

  private getComponentFactory(name: string, resolver: ComponentFactoryResolver) {
    const factories = Array.from<any>(resolver['_factories'].keys());

    const factoryClass = <Type<any>>factories.find((item: any) => item.name === name);

    return resolver.resolveComponentFactory(factoryClass);
  }

  
}
