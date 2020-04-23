import { Component, OnInit, Input } from '@angular/core';
import { BaseInteractionComponent } from '../base-interaction-component';
import { MapComponent } from '../../b3-ol-map.component';
import { DragRotate } from 'ol/interaction';

@Component({
  selector: 'b3-drag-and-rotate',
  templateUrl: './drag-and-rotate.component.html',
  styleUrls: ['./drag-and-rotate.component.css']
})
export class DragAndRotateComponent extends BaseInteractionComponent implements OnInit {
  
  @Input() duration: number;
  
  constructor(mapComponent: MapComponent) {
      super(mapComponent);
  }

  ngOnInit() {
    this.interaction = new DragRotate({
        duration: this.duration || 400
    });

    super.ngOnInit();
  }
}
