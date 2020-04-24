import { Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewInit, SimpleChanges, HostListener, OnChanges } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Map, MapBrowserEvent, View } from 'ol';
import { Control } from 'ol/control';
import { Interaction } from 'ol/interaction';
import { Feature } from 'ol';
import { Layer,Tile } from 'ol/layer';
import { Cluster,OSM } from 'ol/source';
import { transform, fromLonLat } from 'ol/proj';
import { click } from 'ol/events/condition.js';
import Select from 'ol/interaction/Select.js';

@Component({
  selector: 'b3-ol-map',
  template: `<div class="map" [style.width]="width" [style.height]="height"></div><ng-content></ng-content>`
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {

  map: Map;

  selectInteraction = new Select({
    condition: click,
    filter: (feature: Feature, layer: Layer) => {
      return layer && !(layer.getSource() instanceof Cluster);
    }
  })

  controls: Control[] = [];
  interactions: Interaction[] = [this.selectInteraction];

  @Input() width: string = '100%';
  @Input() height: string = '100%';
  
  @Output() outClick: EventEmitter<MapBrowserEvent>;
  @Output() outMoveend: EventEmitter<MapBrowserEvent>;

  constructor(private element: ElementRef, private activatedRoute: ActivatedRoute) {
    this.outClick = new EventEmitter<MapBrowserEvent>();
    this.outMoveend = new EventEmitter<MapBrowserEvent>();
  }

  ngOnInit() {

    this.map = new Map({
      //controls: this.controls,
      interactions: this.interactions
    });

    this.map.setTarget(this.element.nativeElement.firstElementChild);

    this.map.on('click', (event: MapBrowserEvent) => this.outClick.emit(event));
    this.map.on('moveend', (event: MapBrowserEvent) => this.outMoveend.emit(event));

    this.routeControl();
  }

  ngAfterViewInit(): void { 
    this.map.updateSize();
  }
  
  @HostListener('window:resize')
  onWindowResize() {
    this.map.updateSize();
  }

  private routeControl(): void{
    this.activatedRoute.queryParams.subscribe(params => {
      if(params["lon"] && params["lat"]){
        let coordinates = [parseFloat(params["lon"]),parseFloat(params["lat"])];
        let destinationProj = this.map.getView().getProjection().getCode();
        let sourceProj = "EPSG:4326";
        this.map.getView().setCenter(transform(coordinates, sourceProj, destinationProj));
      }
    })
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
