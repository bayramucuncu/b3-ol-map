import { Component, OnInit, Input } from '@angular/core';
import { XmlResponseAcceptedSource } from '../base-vector-source';
import { Vector } from 'ol/source';
import GML2 from 'ol/format/GML2';
import { ProjectionLike } from 'ol/proj';
import { HttpClient } from '@angular/common/http';
import { VectorComponent } from '../../layers/vector/vector.component';

@Component({
  selector: 'b3-source-gml2',
  templateUrl: './gml2.component.html',
  styleUrls: ['./gml2.component.css']
})
export class Gml2Component extends XmlResponseAcceptedSource implements OnInit {
  source: Vector;

  @Input() url: string;
  @Input() featureProjection: ProjectionLike;

  constructor(http: HttpClient, private layerComponent: VectorComponent) {
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
