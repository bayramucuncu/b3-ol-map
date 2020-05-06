import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ProjectionLike, transform } from 'ol/proj';
import { createStringXY } from 'ol/coordinate';
import { MapComponent } from '../../b3-ol-map.component';
import { BaseControlComponent } from '../base-control-component';
import { MapBrowserEvent } from 'ol';

@Component({
  selector: 'b3-control-mouse-position',
  templateUrl: './mouse-position.component.html',
  styleUrls: ['./mouse-position.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MousePositionComponent extends BaseControlComponent implements OnInit {

  @Input() precision: number;
  @Input() precisionLabel: string;
  @Input() projection: ProjectionLike;
  @Input() projectionLabel: string;
  @Input() projections: ProjectionLike[];


  public coordinate: string;
  public isSettingsMode: boolean = false;

  public precisions: any[] = [...Array(11).keys()].map((n: number) => { return { code: n } });

  constructor(mapComponent: MapComponent) {
    super(mapComponent);
  }

  ngOnInit() {
    this.initializeParameters();

    let initCoordinate = this.transformCoordinate(this.mapControl.map.getView().getCenter());
    this.coordinate = this.formatCoordinate(initCoordinate);

    this.mapControl.map.on("click", this.onMapClicked());
  }

  ngOnDestroy() {
    this.mapControl.map.un("click", this.onMapClicked());
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
  
  private initializeParameters() {
    !this.precision && (this.precision = 6);
    !this.precisionLabel && (this.precisionLabel = "Precision");
    !this.projection && (this.projection = "EPSG:3856");
    !this.projectionLabel && (this.projectionLabel = "Projection");
    !this.projections && (this.projections = this.getDefaultProjections());
  }

  private getDefaultProjections(): any{
    return [
      { code: "EPSG:4326" },
      { code: "EPSG:3857" },
      { code: "EPSG:5254" }
    ];
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
