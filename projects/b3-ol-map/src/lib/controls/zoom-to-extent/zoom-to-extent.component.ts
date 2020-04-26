import { Component, OnInit, Input } from '@angular/core';
import { Extent } from 'ol/extent';
import { ZoomToExtent } from 'ol/control';
import { MapComponent } from '../../b3-ol-map.component';
import { BaseControlComponent } from '../base-control-component';

@Component({
  selector: 'b3-zoom-to-extent',
  templateUrl: './zoom-to-extent.component.html',
  styleUrls: ['./zoom-to-extent.component.css']
})
export class ZoomToExtentComponent extends BaseControlComponent implements OnInit {

  @Input() className: string;
  @Input() label: string;
  @Input() target: (string | HTMLElement);
  @Input() tipLabel: string;
  @Input() extent: Extent;

  constructor(mapComponent: MapComponent) {
    super(mapComponent);
  }

  ngOnInit() {
   
    this.control = new ZoomToExtent({
      className: this.className || "ol-zoom-extent",
      target: this.target,
      label: this.label || "E",
      tipLabel: this.tipLabel || "Fit to extent",
      extent: this.extent
    });

   super.ngOnInit();
  }
}
