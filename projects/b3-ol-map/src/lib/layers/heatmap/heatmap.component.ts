import { Component, OnInit, Input, Optional } from '@angular/core';
import { Extent } from 'ol/extent';
import { Heatmap } from 'ol/layer'
import { MapComponent } from '../../b3-ol-map.component';
import { BaseLayerComponent } from '../base-layer';
import { LayerGroupComponent } from '../group/group.component';

@Component({
  selector: 'b3-layer-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent extends BaseLayerComponent implements OnInit {

  @Input() opacity: number;
  @Input() visible: boolean;
  @Input() extent: Extent;
  @Input() zIndex: number;
  @Input() minResolution: number;
  @Input() maxResolution: number;
  @Input() gradient: string[];
  @Input() radius:number;
  @Input() blur: number;
  @Input() shadow: number;
  @Input() weight:string;

  constructor(mapComponent: MapComponent, @Optional() group?: LayerGroupComponent) {
      super(group || mapComponent);
  }

  ngOnInit() {
      this.layer = new Heatmap({
          opacity: this.opacity,
          minResolution: this.minResolution,
          maxResolution: this.maxResolution,
          visible: this.visible,
          extent: this.extent,
          zIndex: this.zIndex,
          gradient: this.gradient,
          radius: this.radius,
          blur: this.blur,
          weight: this.weight
      });

      super.ngOnInit();
  }
}