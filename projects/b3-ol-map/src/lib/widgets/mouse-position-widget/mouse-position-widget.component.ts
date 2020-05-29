import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { transform } from 'ol/proj';
import { createStringXY } from 'ol/coordinate';
import { MapBrowserEvent } from 'ol';
import { WidgetAggregator } from '../widget-aggregator';
import { MapComponent } from '../../b3-ol-map.component';
import Projection from 'ol/proj/Projection';


@Component({
  selector: 'b3-mouse-position-widget',
  templateUrl: './mouse-position-widget.component.html',
  styleUrls: ['./mouse-position-widget.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MousePositionWidgetComponent implements OnInit, WidgetAggregator {

  @Input() widgetData: any;

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

  constructor(private mapComponent: MapComponent) {
    this.mapComponent.map.on("click", this.onMapClicked());
    this.isSettingsMode = false;
  }

  ngOnInit() {
    this.widgetData = this.widgetData || this.defaultWidgetData;

    this.widgetData.settings = { ...this.defaultWidgetData.settings, ...this.widgetData.settings }

    this.selectedProjection = this.widgetData.settings.projections.find((f: any) => f.code === this.widgetData.settings.projection);
    this.selectedPrecision = this.widgetData.settings.precisions.find((f: any) => f.code == this.widgetData.settings.precision);

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
    };
  }

  private transformCoordinate(coordinate: any) {
    return transform(coordinate, this.mapComponent.map.getView().getProjection(), new Projection({ code: this.selectedProjection.code }));
  }

  private formatCoordinate(coordinate: any) {
    let formatterFunc = createStringXY(this.selectedPrecision.code);

    return formatterFunc(coordinate);
  }
}
