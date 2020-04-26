import { Component, OnInit, Input } from '@angular/core';
import Units from 'ol/proj/Units';
import { ScaleLine } from 'ol/control';
import { MapComponent } from '../../b3-ol-map.component';
import { BaseControlComponent } from '../base-control-component';

@Component({
  selector: 'b3-control-scale-line',
  templateUrl: './scale-line.component.html',
  styleUrls: ['./scale-line.component.css']
})
export class ScaleLineComponent extends BaseControlComponent implements OnInit {

  @Input() className: string;
  @Input() minWidth: number;
  @Input() target: (string | HTMLElement);
  @Input() units: (string | Units);
  @Input() bar: boolean; 
  @Input() steps: number;
  @Input() text: boolean;

  constructor(mapComponent: MapComponent) {
    super(mapComponent);
  }

  ngOnInit() {
    this.control = new ScaleLine({
      className: this.className || "ol-scale-line",
      minWidth: this.minWidth || 64,
      target: this.target,
      units: this.units || "metric"
    });

    super.ngOnInit();
  }
}
