import { Component, OnInit, Input } from '@angular/core';
import { Vector } from 'ol/source';
import { XmlResponseAcceptedSource } from '../base-vector-source';
import { ProjectionLike } from 'ol/proj';
import { VectorComponent } from '../../layers/vector/vector.component';
import { HttpClient } from '@angular/common/http';
import { GPX } from 'ol/format';

@Component({
  selector: 'b3-source-gpx',
  templateUrl: './gpx.component.html',
  styleUrls: ['./gpx.component.css']
})
export class GpxComponent extends XmlResponseAcceptedSource implements OnInit {
  source: Vector;

  @Input() url: string;
  @Input() dataProjection: ProjectionLike;
  @Input() featureProjection: ProjectionLike;

  constructor(http: HttpClient, private layerComponent: VectorComponent) {
      super(http)
  }

  ngOnInit(): void {
      let format = new GPX();

      this.source = new Vector({
          url: this.url,
          format: format,
          loader: this.loader(this.layerComponent.layer)
      });

      this.layerComponent.layer.setSource(this.source);
  }
}
