import { Component, OnInit } from '@angular/core';
import { EsrijsonResponseAcceptedSource } from '../base-vector-source';
import { Vector } from 'ol/source';
import { HttpClient } from '@angular/common/http';
import { EsriJSON } from 'ol/format';
import { bbox } from 'ol/loadingstrategy';
import { VectorComponent } from '../../layers/vector/vector.component';

@Component({
  selector: 'b3-source-esrijson',
  templateUrl: './esrijson.component.html',
  styleUrls: ['./esrijson.component.css']
})
export class EsrijsonComponent extends EsrijsonResponseAcceptedSource implements OnInit {
  source: Vector;

  constructor(http: HttpClient, private layerComponent: VectorComponent) {
      super(http)
  }

  ngOnInit(): void {
      this.source = new Vector({
          format: new EsriJSON(),
          strategy: bbox,
          loader: this.loader(this.layerComponent.layer)
      });

      this.layerComponent.layer.setSource(this.source);
  }
}
