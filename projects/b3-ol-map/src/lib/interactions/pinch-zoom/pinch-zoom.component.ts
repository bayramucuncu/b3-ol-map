import { Component, OnInit, Input } from '@angular/core';
import { PinchZoom } from 'ol/interaction';
import { BaseInteractionComponent } from '../base-interaction-component';
import { MapComponent } from '../../b3-ol-map.component';

@Component({
  selector: 'b3-pinch-zoom',
  templateUrl: './pinch-zoom.component.html',
  styleUrls: ['./pinch-zoom.component.css']
})
export class PinchZoomComponent extends BaseInteractionComponent implements OnInit {
  
  @Input() duration: number = 400;
  
  constructor(mapComponent: MapComponent) {
      super(mapComponent);
  }

  ngOnInit() {
    this.interaction = new PinchZoom({
        duration: this.duration
    });

    super.ngOnInit();
  }
}
