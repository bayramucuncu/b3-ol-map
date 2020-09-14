import { Component, OnInit, SkipSelf, Optional } from '@angular/core';
import { Group } from 'ol/layer'
import { MapComponent } from '../../b3-ol-map.component';
import { BaseLayerComponent } from '../base-layer';


@Component({
  selector: 'b3-layer-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
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
