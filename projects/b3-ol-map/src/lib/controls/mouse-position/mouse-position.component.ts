import { Component, OnInit, Input } from '@angular/core';
import { ProjectionLike } from 'ol/proj';
import { MousePosition } from 'ol/control';
import { createStringXY } from 'ol/coordinate';
import { MapComponent } from '../../b3-ol-map.component';
import { BaseControlComponent } from '../base-control-component';

@Component({
  selector: 'b3-mouse-position',
  templateUrl: './mouse-position.component.html',
  styleUrls: ['./mouse-position.component.css']
})
export class MousePositionComponent extends BaseControlComponent implements OnInit {

  @Input() className: string="ol-mouse-position";
  @Input() target: (string | HTMLElement);
  @Input() precision: number;
  @Input() projection: ProjectionLike;
  @Input() undefinedHTML:string = "&#160;";
  
  constructor(mapComponent: MapComponent) {
    super(mapComponent);
  }

  ngOnInit() {
    this.control = new MousePosition({
      className: this.className,
      target: this.target,
      coordinateFormat: createStringXY(this.precision),
      projection: this.projection,
      undefinedHTML: this.undefinedHTML
    });

    super.ngOnInit();
  }
}
