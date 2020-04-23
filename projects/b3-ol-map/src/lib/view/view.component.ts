import { Component, OnInit, SimpleChanges, Input, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';
import { MapComponent } from '../b3-ol-map.component';

@Component({
  selector: 'b3-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnChanges, OnDestroy {

  public instance: View;

  private _zoom: number;
  private _center: Coordinate;
  private _projection: string;
  private _extent: Extent;
  private _maxZoom: number;
  private _minZoom: number;
  private _resoulution: number;

  @Input() maxResolution: number;
  @Input() minResolution: number;
  @Input() resolutions: number[];

  @Output() outZoomChanged: EventEmitter<number>;
  @Output() outCenterChanged: EventEmitter<Coordinate>;
  @Output() outProjectionChanged: EventEmitter<string>;
  @Output() outMinZoomChanged: EventEmitter<number>;
  @Output() outMaxZoomChanged: EventEmitter<number>;
  @Output() outResolutionChanged: EventEmitter<number>;

  constructor(private mapComponent: MapComponent) {
    this.outCenterChanged = new EventEmitter<Coordinate>();
    this.outZoomChanged = new EventEmitter<number>();
    this.outProjectionChanged = new EventEmitter<string>();
    this.outMinZoomChanged = new EventEmitter<number>();
    this.outMaxZoomChanged = new EventEmitter<number>();
    this.outResolutionChanged = new EventEmitter<number>();
  }

  @Input()
  set resolution(value: number) {
    this._resoulution = value;

    if(this.instance) {
      this.instance.setResolution(value);
      this.outResolutionChanged.emit(value);
    }
  }

  get resolution() {
    return this._resoulution;
  }

  @Input()
  set maxZoom(value: number) {
    this._maxZoom = value;

    if (this.instance) {
      this.instance.setMaxZoom(this._maxZoom);
      this.outMaxZoomChanged.emit(value);
    }
  }

  get maxZoom(): number {
    return this._maxZoom;
  }

  @Input()
  set minZoom(value: number) {
    this._minZoom = value;

    if (this.instance) {
      this.instance.setMinZoom(value);
      this.outMinZoomChanged.emit(value);
    }
  }

  get minZoom(): number {
    return this._minZoom;
  }

  @Input()
  set projection(value: string) {
    this._projection = value;

    if (this.instance) {
      this.outProjectionChanged.emit(value);
    }
  };

  get projection() {
    return this._projection;
  }

  @Input()
  set center(value: Coordinate) {
    this._center = value;

    if (this.instance) {
      this.instance.setCenter(value);
      this.outCenterChanged.emit(value);
    }
  }

  get center(): Coordinate {
    return this._center;
  }

  @Input()
  set zoom(value: number) {
    this._zoom = value;

    if (this.instance) {
      this.instance.setZoom(this._zoom);
      this.outZoomChanged.emit(value);
    }
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set extent(value: Extent) {
    this._extent = value;
  }

  get extent(): Extent {
    return this._extent;
  }

  ngOnInit() {
    this.instance = new View({
      center: this.center || [4364549.537769296, 5001346.4204131],
      projection: this.projection || "EPSG:3857",
      zoom: this.zoom || 12,
      minZoom: this.minZoom || 0,
      maxZoom: this.maxZoom || 14,
      extent: this.extent,
      minResolution: this.minResolution,
      maxResolution: this.maxResolution,
      resolution: this.resolution,
      resolutions: this.resolutions
    });

    this.mapComponent.map.setView(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnDestroy(): void {
    this.instance = undefined;
  }
}