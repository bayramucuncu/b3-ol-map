import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';
import { ExtensionAggregator } from './extension-aggregator';
import { ComponentHostDirective } from '../helper/component-host.directive';

@Component({
  selector: 'b3-extension',
  templateUrl: './extension.component.html'
})
export class ExtensionComponent implements OnInit {

  @Input() componentData: any;

  @ViewChild(ComponentHostDirective, { static: true }) componentHostDirective: ComponentHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.componentData.settings.component && this.injectComponent()
  }

  private injectComponent() {
    try {
      const componentFactory = this.getComponentFactory(this.componentData.settings.component, this.componentFactoryResolver);

      const viewContainerRef = this.componentHostDirective.viewContainerRef;
      viewContainerRef.clear();

      const component = viewContainerRef.createComponent(componentFactory);
      (<ExtensionAggregator>component.instance).componentData = this.componentData;
      
      component.changeDetectorRef.detectChanges();
      
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
