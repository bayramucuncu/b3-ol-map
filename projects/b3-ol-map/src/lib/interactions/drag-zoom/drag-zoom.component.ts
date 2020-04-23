import { Component, OnInit, Input } from '@angular/core';
import { BaseInteractionComponent } from '../base-interaction-component';
import { MapComponent } from '../../b3-ol-map.component';
import { DragZoom } from 'ol/interaction';
import { altKeyOnly } from 'ol/events/condition';

@Component({
  selector: 'b3-drag-zoom',
  templateUrl: './drag-zoom.component.html',
  styleUrls: ['./drag-zoom.component.css']
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
