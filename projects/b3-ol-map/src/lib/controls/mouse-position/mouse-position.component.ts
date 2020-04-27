import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ProjectionLike } from 'ol/proj';
import { MousePosition } from 'ol/control';
import { createStringXY } from 'ol/coordinate';
import { MapComponent } from '../../b3-ol-map.component';
import { BaseControlComponent } from '../base-control-component';
import { stat } from 'fs';

@Component({
  selector: 'b3-control-mouse-position',
  templateUrl: './mouse-position.component.html',
  styleUrls: ['./mouse-position.component.css']
})
export class MousePositionComponent extends BaseControlComponent implements OnInit {

  @Input() className: string;
  @Input() target: (string | HTMLElement);
  @Input() precision: number;
  @Input() projection: ProjectionLike;
  @Input() undefinedHTML: string;

  @ViewChild("coordinate", {static: true}) targetElement: ElementRef;

  projections: any[] = [
    { code: "EPSG:4326" },
    { code: "EPSG:3857" },
    { code: "EPSG:5254" }
  ]

  constructor(mapComponent: MapComponent) {
    super(mapComponent);
  }

  selectProjection(value: any){
    (<MousePosition>this.control).setProjection(value)
  }

  onPrecisionChanged(value:any){
    (<MousePosition>this.control).setCoordinateFormat(createStringXY(value))
  }

  ngOnInit() {console.log(this.targetElement)
    this.control = new MousePosition({
      coordinateFormat: createStringXY(this.precision),
      className: this.className || "ol-mouse-position",
      target: this.target || this.targetElement.nativeElement,
      projection: this.projection,
      undefinedHTML: this.undefinedHTML || "&#160;"
    });

    super.ngOnInit();
  }
}
