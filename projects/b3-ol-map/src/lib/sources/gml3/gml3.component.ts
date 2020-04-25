import { Component, OnInit } from '@angular/core';
import { XmlResponseAcceptedSource } from '../base-vector-source';
import { Vector } from 'ol/source';
import GML3 from 'ol/format/GML3';
import { VectorComponent } from '../../layers/vector/vector.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'b3-source-gml3',
  templateUrl: './gml3.component.html',
  styleUrls: ['./gml3.component.css']
})
export class Gml3Component extends XmlResponseAcceptedSource implements OnInit {
  source: Vector;

  constructor(http: HttpClient, private layerComponent: VectorComponent) {
      super(http)
  }

  ngOnInit(): void {

      this.source = new Vector({
          url: this.url,
          format: new GML3(),
          loader: this.loader(this.layerComponent.layer)
      });

      this.layerComponent.layer.setSource(this.source);
  }
}
