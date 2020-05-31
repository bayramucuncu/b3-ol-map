import { Component, OnInit } from '@angular/core';
import { Vector } from 'ol/source';
import { HttpClient } from '@angular/common/http';
import { GeoJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import { WfsResponseAcceptedSource } from '../base-vector-source';
import { VectorComponent } from '../../layers/vector/vector.component';
import { MapComponent } from '../../b3-ol-map.component';

@Component({
  selector: 'b3-source-wfs',
  templateUrl: './wfs.component.html',
  styleUrls: ['./wfs.component.css']
})
export class WfsComponent extends WfsResponseAcceptedSource implements OnInit {
  source: Vector;

  constructor(http: HttpClient, private mapComponent: MapComponent, private layerComponent: VectorComponent) {
    super(http);
  }

  ngOnInit(): void {
    const projection = this.mapComponent.map.getView().getProjection();

    let format = new GeoJSON({
      dataProjection: this.dataProjection || projection,
      featureProjection: this.featureProjection || projection,
      geometryName: this.geometryName
    });

    this.source = new Vector({
      format: format,
      strategy: bbox,
      loader: this.loader(this.layerComponent.layer)
    });

    this.layerComponent.layer.setSource(this.source);
  }

}
