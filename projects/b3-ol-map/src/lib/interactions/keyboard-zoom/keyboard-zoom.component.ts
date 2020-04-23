import { Component, OnInit, Input } from '@angular/core';
import { BaseInteractionComponent } from '../base-interaction-component';
import { MapComponent } from '../../b3-ol-map.component';
import { KeyboardZoom } from 'ol/interaction';
import { targetNotEditable } from 'ol/events/condition'

@Component({
  selector: 'b3-keyboard-zoom',
  templateUrl: './keyboard-zoom.component.html',
  styleUrls: ['./keyboard-zoom.component.css']
})
export class KeyboardZoomComponent extends BaseInteractionComponent implements OnInit {
  
  @Input() duration: number;
  @Input() delta: number;
  
  constructor(mapComponent: MapComponent) {
      super(mapComponent);
  }

  ngOnInit() {
    this.interaction = new KeyboardZoom({
        duration: this.duration || 100,
        delta: this.delta || 1,
        condition: targetNotEditable
    });

    super.ngOnInit();
  }
}