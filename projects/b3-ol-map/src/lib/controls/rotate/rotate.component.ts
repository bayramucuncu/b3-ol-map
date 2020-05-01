import { Component, OnInit, Input } from '@angular/core';
import { BaseControlComponent } from '../base-control-component';
import { MapComponent } from '../../b3-ol-map.component';
import { Rotate } from 'ol/control';

@Component({
  selector: 'b3-control-rotate',
  templateUrl: './rotate.component.html',
  styleUrls: ['./rotate.component.css']
})
export class RotateComponent extends BaseControlComponent implements OnInit {

  @Input() className: string;
  @Input() label: (string | HTMLElement);
  @Input() target: (string | HTMLElement);
  @Input() tipLabel: string;
  @Input() duration: number;
  @Input() autoHide: boolean;

  constructor(mapComponent: MapComponent) {
    super(mapComponent);
  }

  ngOnInit() {
    this.control = new Rotate({
      className: this.className || 'ol-rotate',
      label: '⇧',
      tipLabel: this.tipLabel || 'Reset rotation',
      duration: this.duration || 250,
      autoHide: this.autoHide || true,
      target: this.target
    });

    super.ngOnInit();
  }

}
