import { Component, OnInit, ComponentRef, ViewChild, Input, ComponentFactoryResolver, ElementRef, Type, AfterViewInit } from '@angular/core';
import Overlay from 'ol/Overlay';
import Feature from 'ol/Feature';
import { Select } from 'ol/interaction';
import { click } from 'ol/events/condition.js';
import OverlayPositioning from 'ol/OverlayPositioning';
import { ComponentHostDirective } from '../../../helper/component-host.directive';
import { MapComponent } from '../../../b3-ol-map.component';
import { VectorComponent } from '../vector.component';

@Component({
  selector: 'b3-feature-info-widget-container',
  templateUrl: './feature-info-widget-container.component.html',
  styleUrls: ['./feature-info-widget-container.component.css']
})
export class FeatureInfoWidgetContainerComponent implements OnInit, AfterViewInit {

  private featureInfoComponent: ComponentRef<any>;
  private overlay: Overlay;
  private selectInteraction: Select;

  @ViewChild(ComponentHostDirective, { static: true }) componentHostDirective: ComponentHostDirective;

  @Input() componentData: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, public element: ElementRef, private layerComponent: VectorComponent, private mapComponent: MapComponent) {

    let selectInteractions = mapComponent.map.getInteractions().getArray().filter(s => s instanceof Select);

    this.selectInteraction = selectInteractions.length > 0 ? <Select>selectInteractions[0] : new Select({ condition: click });

    selectInteractions.length === 0 && mapComponent.map.addInteraction(this.selectInteraction);

    this.selectInteraction.on("select", (e) => {
      e.selected.forEach((feature: Feature) => {
        this.selectInteraction.getLayer(feature) === this.layerComponent.layer
          ? this.overlay.setPosition(e.mapBrowserEvent.coordinate)
          : this.overlay.setPosition(undefined);
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
      positioning: OverlayPositioning.BOTTOM_CENTER,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.mapComponent.map.addOverlay(this.overlay);
  }

  ngOnDestroy() {
    this.featureInfoComponent && this.featureInfoComponent.changeDetectorRef.detach();
    this.mapComponent.map.removeOverlay(this.overlay);
  }

  onPopupClose(): void {
    this.overlay.setPosition(undefined);
    this.selectInteraction.getFeatures().clear();
  }

  private injectComponent() {
    let componentType = (this.componentData && this.componentData.infoComponentType) || "FeatureInfoWidgetComponent";

    const componentFactory = this.getComponentFactory(componentType, this.componentFactoryResolver);

    const viewContainerRef = this.componentHostDirective.viewContainerRef;

    viewContainerRef.clear();

    this.featureInfoComponent = viewContainerRef.createComponent(componentFactory);

    this.featureInfoComponent.instance && (this.featureInfoComponent.instance.selectInteraction = this.selectInteraction);

    this.featureInfoComponent.changeDetectorRef.detectChanges();
  }

  private getComponentFactory(name: string, resolver: ComponentFactoryResolver) {
    const factories = Array.from<any>(resolver['_factories'].keys());

    const factoryClass = <Type<any>>factories.find((item: any) => item.name === name);

    return resolver.resolveComponentFactory(factoryClass);
  }

}
