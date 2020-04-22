import { Component, OnInit, SkipSelf, Optional, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Group } from 'ol/layer'
import { MapComponent } from '../..';
import { BaseLayerComponent } from '../base-layer';


@Component({
  selector: 'b3-layer-group',
  templateUrl: './layer-group.component.html',
  styleUrls: ['./layer-group.component.css']
})
export class LayerGroupComponent extends BaseLayerComponent implements OnInit {

  constructor(mapComponent: MapComponent, @SkipSelf() @Optional() group?: LayerGroupComponent) {
      super(group || mapComponent);
  }

  ngOnInit() {
      this.layer = new Group();

      super.ngOnInit();
  }
}
