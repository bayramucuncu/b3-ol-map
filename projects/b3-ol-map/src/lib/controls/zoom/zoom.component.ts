import { Component, OnInit, Input } from '@angular/core';
import { BaseControlComponent } from '../base-control-component';
import { MapComponent } from '../../b3-ol-map.component';
import { Zoom } from 'ol/control';

@Component({
  selector: 'b3-control-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent extends BaseControlComponent implements OnInit {

  @Input() className: string;
  @Input() duration: number;
  @Input() zoomInLabel: (string | HTMLElement);
  @Input() zoomOutLabel: (string | HTMLElement);
  @Input() zoomInTipLabel: string;
  @Input() zoomOutTipLabel: string;
  @Input() delta: number;

  constructor(mapComponent: MapComponent) {
    super(mapComponent);
  }

  ngOnInit() {
    this.control = new Zoom({
      className:this.className || "ol-zoom",
      duration: this.duration,
      zoomInLabel: this.zoomInLabel,
      zoomOutLabel: this.zoomOutLabel,
      zoomInTipLabel: this.zoomInTipLabel,
      zoomOutTipLabel: this.zoomOutTipLabel
    });

    super.ngOnInit();
  }
}
