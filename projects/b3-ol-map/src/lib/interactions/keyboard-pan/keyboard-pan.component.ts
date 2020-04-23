import { Component, OnInit, Input } from '@angular/core';
import { BaseInteractionComponent } from '../base-interaction-component';
import { MapComponent } from '../../b3-ol-map.component';
import { KeyboardPan } from 'ol/interaction';
import { noModifierKeys, targetNotEditable  } from 'ol/events/condition';

@Component({
  selector: 'b3-keyboard-pan',
  templateUrl: './keyboard-pan.component.html',
  styleUrls: ['./keyboard-pan.component.css']
})
export class KeyboardPanComponent extends BaseInteractionComponent implements OnInit {
  
  @Input() duration: number;
  @Input() pixelDelta: number;
  
  constructor(mapComponent: MapComponent) {
      super(mapComponent);
  }

  ngOnInit() {
    this.interaction = new KeyboardPan({
        duration: this.duration || 100,
        pixelDelta: this.pixelDelta || 128,
        condition: noModifierKeys && targetNotEditable
    });

    super.ngOnInit();
  }
}
