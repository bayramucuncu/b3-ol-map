import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';
import { WidgetHostDirective } from '../helper/widget-host.directive';
import { WidgetAggregator } from './widget-aggregator';

@Component({
  selector: 'b3-widget',
  templateUrl: './widget.component.html'
})
export class WidgetComponent implements OnInit {

  @Input() widgetData: any;

  @ViewChild(WidgetHostDirective, { static: true }) widgetHostDirective: WidgetHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.widgetData.widgetComponent && this.injectComponent()
  }

  private injectComponent() {
    try {
      const componentFactory = this.getComponentFactory(this.widgetData.widgetComponent, this.componentFactoryResolver);

      const viewContainerRef = this.widgetHostDirective.viewContainerRef;
      viewContainerRef.clear();

      const component = viewContainerRef.createComponent(componentFactory);
      (<WidgetAggregator>component.instance).widgetData = this.widgetData;
      
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
