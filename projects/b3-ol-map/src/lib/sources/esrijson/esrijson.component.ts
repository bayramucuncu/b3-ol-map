import { Component, OnInit, Optional } from '@angular/core';
import { EsrijsonResponseAcceptedSource } from '../base-vector-source';
import { Vector } from 'ol/source';
import { HttpClient } from '@angular/common/http';
import { EsriJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import { VectorComponent } from '../../layers/vector/vector.component';
import { HeatmapComponent } from '../../layers/heatmap/heatmap.component';

@Component({
  selector: 'b3-source-esrijson',
  templateUrl: './esrijson.component.html',
  styleUrls: ['./esrijson.component.css']
})
export class EsrijsonComponent extends EsrijsonResponseAcceptedSource implements OnInit {
  source: Vector;

  constructor(http: HttpClient,
    @Optional() private layerComponent?: VectorComponent,
    @Optional() private heatmapLayerComponent?: HeatmapComponent) {
    super(http);
  }

  ngOnInit(): void {

    let layer = this.layerComponent
      ? this.layerComponent.layer
      : this.heatmapLayerComponent.layer;

    this.source = new Vector({
      format: new EsriJSON(),
      strategy: bbox,
      loader: this.loader(layer)
    });

    layer.setSource(this.source);
  }
}
