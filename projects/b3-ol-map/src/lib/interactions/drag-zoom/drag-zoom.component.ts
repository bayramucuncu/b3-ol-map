import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DragZoom } from 'ol/interaction';
import { altKeyOnly } from 'ol/events/condition';
import { MapComponent } from '../../b3-ol-map.component';
import { BaseInteractionComponent } from '../base-interaction-component';

@Component({
  selector: 'b3-drag-zoom',
  templateUrl: './drag-zoom.component.html',
  styleUrls: ['./drag-zoom.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DragZoomComponent extends BaseInteractionComponent implements OnInit {
  
  @Input() duration: number;
  @Input() minArea: number;
  @Input() className: string;
  @Input() out: boolean;
  
  constructor(mapComponent: MapComponent) {
      super(mapComponent);
  }

  ngOnInit() {
    this.interaction = new DragZoom({
        className: this.className || "ol-dragbox",
        duration: this.duration || 200,
        minArea: this.minArea || 64,
        out: this.out || false,
        condition: altKeyOnly
    });

    super.ngOnInit();
  }
}
