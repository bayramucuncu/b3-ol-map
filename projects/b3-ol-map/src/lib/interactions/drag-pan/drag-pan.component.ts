import { Component, OnInit } from '@angular/core';
import { BaseInteractionComponent } from '../base-interaction-component';
import { MapComponent } from '../../b3-ol-map.component';
import { DragPan } from 'ol/interaction';

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
    this.interaction = new DragPan();

    super.ngOnInit(); 
  }
}
