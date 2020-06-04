import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectorRef, NgZone } from '@angular/core';
import { transform } from 'ol/proj';
import { createStringXY } from 'ol/coordinate';
import { MapBrowserEvent } from 'ol';
import { ExtensionAggregator } from '../extension-aggregator';
import { MapComponent } from '../../b3-ol-map.component';
import Projection from 'ol/proj/Projection';


@Component({
  selector: 'b3-mouse-position-extension',
  templateUrl: './mouse-position-extension.component.html',
  styleUrls: ['./mouse-position-extension.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MousePositionExtensionComponent implements OnInit, ExtensionAggregator {

  @Input() componentData: any;

  private defaultWidgetData: any = {
    settings: {
      precision: 6,
      precisions: [...Array(11).keys()].map((n: number) => { return { code: n } }),
      precisionLabel: "Precision",
      projectionLabel: "Projection",
      projection: "EPSG:3857",
      projections: [
        { code: "EPSG:4326" },
        { code: "EPSG:3857" },
        { code: "EPSG:5254" }
      ]
    }
  }

  public coordinate: string;
  public isSettingsMode: boolean;
  public precisions: any[];

  public selectedProjection: any;
  public selectedPrecision: any;

  constructor(private mapComponent: MapComponent, private ref: ChangeDetectorRef) {
    this.isSettingsMode = false;
  }

  ngOnInit() {
    this.mapComponent.map.on("click", this.onMapClicked());
    this.componentData = this.componentData || this.defaultWidgetData;

    this.componentData.settings = { ...this.defaultWidgetData.settings, ...this.componentData.settings }

    this.selectedProjection = this.componentData.settings.projections.find((f: any) => f.code === this.componentData.settings.projection);
    this.selectedPrecision = this.componentData.settings.precisions.find((f: any) => f.code == this.componentData.settings.precision);

    this.coordinate = this.formatCoordinate(this.transformCoordinate(this.mapComponent.map.getView().getCenter()));

  }

  ngOnDestroy() {
    this.mapComponent.map.un("click", this.onMapClicked());
  }

  toggleSettingsMode() {
    this.isSettingsMode = !this.isSettingsMode;
  }

  private onMapClicked(): (evt: MapBrowserEvent) => void {
    return (event: MapBrowserEvent) => {
      let coordinate = this.transformCoordinate(event.coordinate);
      this.coordinate = this.formatCoordinate(coordinate);
      this.ref.detectChanges(); // if not set, Coordinate does not change in dynamic components.
    }
  }

  private transformCoordinate(coordinate: any) {
    return transform(coordinate, this.mapComponent.map.getView().getProjection(), new Projection({ code: this.selectedProjection.code }));
  }

  private formatCoordinate(coordinate: any) {
    let formatterFunc = createStringXY(this.selectedPrecision.code);

    return formatterFunc(coordinate);
  }
}
