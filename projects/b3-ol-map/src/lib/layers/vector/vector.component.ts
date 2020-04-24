import { Component, OnInit, Optional, Input} from '@angular/core';
import { Vector } from 'ol/layer'
import { Extent } from 'ol/extent';
import Style, { StyleFunction } from 'ol/style/Style';
import { BaseLayerComponent } from '../base-layer';
import { MapComponent } from '../../b3-ol-map.component';
import { LayerGroupComponent } from '../group/group.component';

@Component({
  selector: 'b3-layer-vector',
  templateUrl: './vector.component.html',
  styleUrls: ['./vector.component.css']
})
export class VectorComponent extends BaseLayerComponent implements OnInit {

  @Input() opacity: number;
  @Input() extent: Extent;
  @Input() minResolution: number;
  @Input() maxResolution: number;
  @Input() renderBuffer: number;
  @Input() declutter: boolean;
  @Input() style: (Style | Style[] | StyleFunction);
  @Input() updateWhileAnimating: boolean;
  @Input() updateWhileInteracting: boolean;
  @Input() visible: boolean;
  @Input() zIndex: number;

  constructor(mapComponent: MapComponent, @Optional() group?: LayerGroupComponent) {
      super(group || mapComponent);
  }

  ngOnInit() {
      this.layer = new Vector({
          opacity: this.opacity,
          extent: this.extent,
          minResolution: this.minResolution,
          maxResolution: this.maxResolution,
          renderBuffer: this.renderBuffer,
          declutter: this.declutter,
          style: this.style,
          updateWhileAnimating: this.updateWhileAnimating,
          updateWhileInteracting: this.updateWhileInteracting,
          visible: this.visible,
          zIndex: this.zIndex
      });

      super.ngOnInit();
  }
}
