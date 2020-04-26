import { Component, OnInit, Input } from '@angular/core';
import { ZoomSlider } from 'ol/control';
import { MapComponent } from '../../b3-ol-map.component';
import { BaseControlComponent } from '../base-control-component';

@Component({
  selector: 'b3-zoom-slider',
  templateUrl: './zoom-slider.component.html',
  styleUrls: ['./zoom-slider.component.css']
})
export class ZoomSliderComponent extends BaseControlComponent implements OnInit {

  @Input() className: string;
  @Input() duration: number;

  constructor(mapControl: MapComponent) {
    super(mapControl);
   }

  ngOnInit() {
    this.control = new ZoomSlider({
      className: this.className || "ol-zoomslider",
      duration: this.duration || 200
    });

   super.ngOnInit();
  }
}