import { Component, OnInit } from '@angular/core';
import { XmlResponseAcceptedSource } from '../base-vector-source';
import { Vector } from 'ol/source';
import GML32 from 'ol/format/GML32';
import { VectorComponent } from '../../layers/vector/vector.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'b3-source-gml32',
  templateUrl: './gml32.component.html',
  styleUrls: ['./gml32.component.css']
})
export class Gml32Component extends XmlResponseAcceptedSource implements OnInit {
  source: Vector;

  constructor(http: HttpClient, private layerComponent: VectorComponent) {
      super(http)
  }

  ngOnInit(): void {
      this.source = new Vector({
          url: this.url,
          format: new GML32(),
          loader: this.loader(this.layerComponent.layer)
      });

      this.layerComponent.layer.setSource(this.source);
  }
}
