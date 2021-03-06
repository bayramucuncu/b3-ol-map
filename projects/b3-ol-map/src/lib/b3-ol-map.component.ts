import { Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewInit, SimpleChanges, 
          HostListener, OnChanges, ViewEncapsulation, ViewChild } from '@angular/core';
import { Map, MapBrowserEvent } from 'ol';
import { Control } from 'ol/control';
import { Interaction } from 'ol/interaction';
import { LayerContainerService } from './layers/layer-container.service';

@Component({
  selector: 'b3-ol-map',
  templateUrl: 'b3-ol-map.component.html',
  styleUrls: ['b3-ol-map.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [LayerContainerService]
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild("map", { static: true }) mapDiv: ElementRef;

  private _width: string = '100%';
  private _height: string = '100%';
  
  map: Map;
  controls: Control[] = [];
  interactions: Interaction[] = [];
 
  get width(): string {
    return this._width;
  }

  @Input() set width(value: string) {
    this._width = value;
    this.mapDiv.nativeElement.style.width = value;
    this.updateMap();
  }

  get height(): string {
    return this._height;
  }
  
  @Input() set height(value: string) {
    this._height = value;
    this.mapDiv.nativeElement.style.height = value;
    this.updateMap();
  }

  @Output() outClick: EventEmitter<MapBrowserEvent>;
  @Output() outMoveend: EventEmitter<MapBrowserEvent>;

  @HostListener('window:resize', ["$event"]) onWindowResize(event: any) {
    this.updateMap();
  }

  constructor() {
    this.outClick = new EventEmitter<MapBrowserEvent>();
    this.outMoveend = new EventEmitter<MapBrowserEvent>();
  }

  private updateMap(){
    this.map && this.map.updateSize();
  }

  ngOnInit() {
    this.map = new Map({
      controls: this.controls,
      interactions: this.interactions,
      keyboardEventTarget: document
    });

    this.map.setTarget(this.mapDiv.nativeElement);

    this.map.on('click', (event: MapBrowserEvent) => this.outClick.emit(event));
    this.map.on('moveend', (event: MapBrowserEvent) => this.outMoveend.emit(event));
  }

  ngAfterViewInit(): void {
    this.map.updateSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let properties: { [index: string]: any } = {};

    if (!this.map) {
      return;
    }

    for (let key in changes) {
      if (changes.hasOwnProperty(key)) {
        properties[key] = changes[key].currentValue;
      }
    }

    this.map.setProperties(properties, false);
  }

  ngOnDestroy() {
    this.map = undefined;
  }

}
