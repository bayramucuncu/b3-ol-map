import { Component, OnInit, Input } from '@angular/core';
import { BaseInteractionComponent } from '../base-interaction-component';
import { PinchRotate } from 'ol/interaction';
import { MapComponent } from '../../b3-ol-map.component';

@Component({
  selector: 'b3-pinch-rotate',
  templateUrl: './pinch-rotate.component.html',
  styleUrls: ['./pinch-rotate.component.css']
})
export class PinchRotateComponent  extends BaseInteractionComponent implements OnInit {
  
  @Input() duration: number;
  @Input() threshold: number;
  
  constructor(mapComponent: MapComponent) {
      super(mapComponent);
  }

  ngOnInit() {
    this.interaction = new PinchRotate({
        duration: this.duration || 250,
        threshold: this.threshold || 0.3
    });

    super.ngOnInit();
  }
}
