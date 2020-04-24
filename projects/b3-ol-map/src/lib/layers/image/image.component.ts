import { Component, OnInit, Input, Optional } from '@angular/core';
import { Extent } from 'ol/extent';
import { Image } from 'ol/layer'
import { BaseLayerComponent } from '../base-layer';
import { MapComponent } from '../../b3-ol-map.component';
import { LayerGroupComponent } from '../group/group.component';

@Component({
  selector: 'b3-layer-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent extends BaseLayerComponent implements OnInit {

  @Input() opacity: number;
  @Input() minResolution: number;
  @Input() maxResolution: number;
  @Input() visible: boolean;
  @Input() extent: Extent;
  @Input() zIndex: number;

  constructor(mapComponent: MapComponent, @Optional() group?: LayerGroupComponent) {
    super(group || mapComponent);
  }
 
  ngOnInit() {
    this.layer = new Image({
      opacity: this.opacity,
      minResolution: this.minResolution,
      maxResolution: this.maxResolution,
      visible: this.visible,
      extent: this.extent,
      zIndex: this.zIndex
    });

    super.ngOnInit();
  }
}
