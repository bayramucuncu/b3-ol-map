import { Component, OnInit, ComponentRef, ViewChild, Input, ComponentFactoryResolver, ElementRef, Type, AfterViewInit } from '@angular/core';
import Overlay from 'ol/Overlay';
import Feature from 'ol/Feature';
import { WidgetHostDirective } from './widget-host.directive';
import { MapComponent } from '../../../b3-ol-map.component';
import { VectorComponent } from '../vector.component';
import { IDynamicComponent } from '../../../dynamic-component.contract';
import OverlayPositioning from 'ol/OverlayPositioning';

@Component({
  selector: 'b3-feature-info-widget-container',
  templateUrl: './feature-info-widget-container.component.html',
  styleUrls: ['./feature-info-widget-container.component.css']
})
export class FeatureInfoWidgetContainerComponent implements OnInit, IDynamicComponent, AfterViewInit {

  private featureInfoComponent: ComponentRef<any>;
  private overlay: Overlay;

  @ViewChild(WidgetHostDirective, { static: true }) widgetHostDirective: WidgetHostDirective;

  @Input() widgetData: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, public element: ElementRef, private layerComponent: VectorComponent, private mapComponent: MapComponent) {
    
    this.mapComponent.selectInteraction.on("select", (e) => {
      e.selected.forEach((feature: Feature) => {
        if (this.mapComponent.selectInteraction.getLayer(feature) === this.layerComponent.layer)
          this.overlay.setPosition(e.mapBrowserEvent.coordinate);
        else
          this.overlay.setPosition(undefined);
      })

      if (e.selected.length === 0 && e.deselected.length > 0)
        this.onPopupClose();
    })
  }

  ngOnInit() {
    this.injectComponent()
  }

  ngAfterViewInit(): void {
    this.overlay = new Overlay({
      element: this.element.nativeElement.children[0],
      autoPan: true,
      positioning:OverlayPositioning.BOTTOM_CENTER,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.mapComponent.map.addOverlay(this.overlay);
  }
  
  getComponentType(): string {
    return this.constructor.name;
  }

  ngOnDestroy() {
    this.featureInfoComponent && this.featureInfoComponent.changeDetectorRef.detach();
    this.mapComponent.map.removeOverlay(this.overlay);
  }

  onPopupClose(): void {
    this.overlay.setPosition(undefined);
    this.mapComponent.selectInteraction.getFeatures().clear();
  }

  private injectComponent() {
    let componentType = (this.widgetData && this.widgetData.infoComponentType) || "FeatureInfoWidgetComponent";

    const componentFactory = this.getComponentFactory(componentType, this.componentFactoryResolver);

    const viewContainerRef = this.widgetHostDirective.viewContainerRef;

    viewContainerRef.clear();

    this.featureInfoComponent = viewContainerRef.createComponent(componentFactory);

    this.featureInfoComponent.instance && (this.featureInfoComponent.instance.selectInteraction = this.mapComponent.selectInteraction);

    this.featureInfoComponent.changeDetectorRef.detectChanges();
  }

  private getComponentFactory(name: string, resolver: ComponentFactoryResolver) {
    const factories = Array.from<any>(resolver['_factories'].keys());

    const factoryClass = <Type<any>>factories.find((item: any) => item.name === name);

    return resolver.resolveComponentFactory(factoryClass);
  }

}
