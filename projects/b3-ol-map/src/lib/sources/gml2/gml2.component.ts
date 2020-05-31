import { Component, OnInit } from '@angular/core';
import { XmlResponseAcceptedSource } from '../base-vector-source';
import { Vector } from 'ol/source';
import GML2 from 'ol/format/GML2';
import { HttpClient } from '@angular/common/http';
import { VectorComponent } from '../../layers/vector/vector.component';
import { MapComponent } from '../../b3-ol-map.component';

@Component({
  selector: 'b3-source-gml2',
  templateUrl: './gml2.component.html',
  styleUrls: ['./gml2.component.css']
})
export class Gml2Component extends XmlResponseAcceptedSource implements OnInit {
  source: Vector;

  constructor(http: HttpClient, private mapComponent: MapComponent, private layerComponent: VectorComponent) {
      super(http)
  }

  ngOnInit(): void {

      let format = new GML2()

      this.source = new Vector({
          url: this.url,
          format: format,
          loader: this.loader(this.layerComponent.layer)
      });

      this.layerComponent.layer.setSource(this.source);
  }
}
