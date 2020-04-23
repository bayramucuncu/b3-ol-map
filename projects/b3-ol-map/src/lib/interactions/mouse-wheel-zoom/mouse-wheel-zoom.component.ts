import { Component, OnInit, Input } from '@angular/core';
import { MapComponent } from '../../b3-ol-map.component';
import { MouseWheelZoom } from 'ol/interaction';
import { BaseInteractionComponent } from '../base-interaction-component';

@Component({
  selector: 'b3-mouse-wheel-zoom',
  templateUrl: './mouse-wheel-zoom.component.html',
  styleUrls: ['./mouse-wheel-zoom.component.css']
})
export class MouseWheelZoomComponent extends BaseInteractionComponent implements OnInit {

  @Input() duration: number;
  @Input() timeout: number;
  @Input() useAnchor: boolean;
  @Input() maxDelta: number;
 
  constructor(mapComponent: MapComponent) {
      super(mapComponent);
  }

  ngOnInit() {
    this.interaction = new MouseWheelZoom({
        duration: this.duration || 50,
        timeout: this.timeout || 80,
        useAnchor: this.useAnchor || true,
        maxDelta: this.maxDelta || 1
    });

    super.ngOnInit(); 
  }

}
