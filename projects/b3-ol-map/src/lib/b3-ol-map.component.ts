import { Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewInit, SimpleChanges, HostListener, OnChanges, ViewEncapsulation } from '@angular/core';
import { Map, MapBrowserEvent} from 'ol';
import { Control } from 'ol/control';
import { Interaction } from 'ol/interaction';

@Component({
  selector: 'b3-ol-map',
  templateUrl: 'b3-ol-map.component.html',
  styleUrls: [ 'b3-ol-map.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {

  map: Map;

  controls: Control[] = [];
  interactions: Interaction[] = [];

  @Input() width: string = '100%';
  @Input() height: string = '100%';

  @Output() outClick: EventEmitter<MapBrowserEvent>;
  @Output() outMoveend: EventEmitter<MapBrowserEvent>;
  
  @HostListener('window:resize') onWindowResize() {
    this.map.updateSize();
  }

  constructor(private element: ElementRef) {
    this.outClick = new EventEmitter<MapBrowserEvent>();
    this.outMoveend = new EventEmitter<MapBrowserEvent>();
  }

  ngOnInit() {

    this.map = new Map({
      controls: this.controls,
      interactions: this.interactions,
      keyboardEventTarget: document
    });

    this.map.setTarget(this.element.nativeElement.firstElementChild);

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
