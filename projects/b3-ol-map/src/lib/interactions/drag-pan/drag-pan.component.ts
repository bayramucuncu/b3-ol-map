import { Component, OnInit } from '@angular/core';
import { BaseInteractionComponent } from '../base-interaction-component';
import { MapComponent } from '../../b3-ol-map.component';
import { DragPan } from 'ol/interaction';
import Kinetic  from 'ol/Kinetic';

@Component({
  selector: 'b3-drag-pan',
  templateUrl: './drag-pan.component.html',
  styleUrls: ['./drag-pan.component.css']
})
export class DragPanComponent extends BaseInteractionComponent implements OnInit {
  
  constructor(mapComponent: MapComponent) {
      super(mapComponent);
  }

  ngOnInit() {
    this.interaction = new DragPan({
      kinetic: new Kinetic(-0.005, 0.05, 100)
    });

    super.ngOnInit(); 
  }
}
