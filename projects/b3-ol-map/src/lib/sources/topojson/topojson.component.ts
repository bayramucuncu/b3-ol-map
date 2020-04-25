import { Component, OnInit, Input } from '@angular/core';
import { XmlResponseAcceptedSource } from '../base-vector-source';
import { Vector } from 'ol/source';
import { TopoJSON } from 'ol/format';
import { HttpClient } from '@angular/common/http';
import { VectorComponent } from '../../layers/vector/vector.component';

@Component({
  selector: 'b3-source-topojson',
  templateUrl: './topojson.component.html',
  styleUrls: ['./topojson.component.css']
})
export class TopojsonComponent extends XmlResponseAcceptedSource implements OnInit {
  source: Vector;

  @Input() layerName: string;
  @Input() layers: string[];

  constructor(http: HttpClient, private layerComponent: VectorComponent) {
      super(http);
  }

  ngOnInit(): void {

      let format = new TopoJSON({
          dataProjection: this.dataProjection,
          layerName: this.layerName,
          layers: this.layers
      });

      this.source = new Vector({
          url: this.url,
          format: format,
          loader: this.loader(this.layerComponent.layer)
      });

      this.layerComponent.layer.setSource(this.source);
  }
}
