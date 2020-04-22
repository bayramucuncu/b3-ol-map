import { Component, OnInit, Input, Optional } from '@angular/core';
import { Extent } from 'ol/extent';
import { Tile } from 'ol/layer'
import { BaseLayerComponent } from '../base-layer';
import { MapComponent } from '../../b3-ol-map.component';
import { LayerGroupComponent } from '../layer-group/layer-group.component';

@Component({
  selector: 'b3-layer-tile',
  templateUrl: './layer-tile.component.html',
  styleUrls: ['./layer-tile.component.css']
})
export class LayerTileComponent extends BaseLayerComponent implements OnInit {

  @Input() opacity: number; 
  @Input() preload: number;
  @Input() minResolution: number;
  @Input() maxResolution: number;
  @Input() visible: boolean;
  @Input() extent: Extent;
  @Input() useInterimTilesOnError: boolean;
  @Input() zIndex: number;

  constructor(mapComponent: MapComponent, @Optional() group?: LayerGroupComponent) {
    super(group || mapComponent);
  }
 
  ngOnInit() {
    this.layer = new Tile({
      opacity: this.opacity,
      preload: this.preload,
      minResolution: this.minResolution,
      maxResolution: this.maxResolution,
      visible: this.visible,
      extent: this.extent,
      useInterimTilesOnError: this.useInterimTilesOnError
    });
    
    super.ngOnInit();
  }
}
