import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ProjectionLike, transform } from 'ol/proj';
import { createStringXY } from 'ol/coordinate';
import { MapComponent } from '../../b3-ol-map.component';
import { BaseControlComponent } from '../base-control-component';
import { MapBrowserEvent } from 'ol';

@Component({
  selector: 'b3-control-mouse-position',
  templateUrl: './mouse-position.component.html',
  styleUrls: ['./mouse-position.component.css']
})
export class MousePositionComponent extends BaseControlComponent implements OnInit {

  @Input() className: string;
  @Input() target: (string | HTMLElement);
  @Input() precision: number;
  @Input() projection: ProjectionLike;
  @Input() undefinedHTML: string;

  public coordinate: string = "";
  public isSettingsMode: boolean = false;

  public projections: any[] = [
    { code: "EPSG:4326" },
    { code: "EPSG:3857" },
    { code: "EPSG:5254" }
  ]

  public precisions: any[] = [
    { code: 0 },
    { code: 1 },
    { code: 2 },
    { code: 3 },
    { code: 4 },
    { code: 5 },
    { code: 6 }
  ]

  constructor(mapComponent: MapComponent) {
    super(mapComponent);
  }

  toggleSettingsMode() {
    this.isSettingsMode = !this.isSettingsMode;
  }

  selectProjection(value: any) {
    this.projection = value;
  }

  selectPrecision(value: any) {
    this.precision = value;
  }

  ngOnInit() {
    let initCoordinate = this.transformCoordinate(this.mapControl.map.getView().getCenter());
    this.coordinate = this.formatCoordinate(initCoordinate);

    this.mapControl.map.on("click", this.onMapClicked());
  }

  ngOnDestroy() {
    this.mapControl.map.un("click", this.onMapClicked());
  }

  private onMapClicked(): (evt: MapBrowserEvent) => void {
    return (event: MapBrowserEvent) => {
      let coordinate = this.transformCoordinate(event.coordinate);
      this.coordinate = this.formatCoordinate(coordinate);
    };
  }

  private transformCoordinate(coordinate: any) {
    return transform(coordinate, this.mapControl.map.getView().getProjection(), this.projection);
  }

  private formatCoordinate(coordinate: any) {
    let formatterFunc = createStringXY(this.precision);

    return formatterFunc(coordinate);
  }
}
