import { Component, OnInit, Input } from '@angular/core';
import { Vector } from 'ol/source';
import { ProjectionLike } from 'ol/proj';
import { Extent } from 'ol/extent';
import { WKT } from 'ol/format';
import { VectorComponent } from '../../layers/vector/vector.component';

@Component({
  selector: 'b3-source-wkt',
  templateUrl: './wkt.component.html',
  styleUrls: ['./wkt.component.css']
})
export class WktComponent implements OnInit {
  source: Vector;

  @Input() wkt: string;
  @Input() dataProjection: ProjectionLike;
  @Input() featureProjection: ProjectionLike;
  @Input() extent: Extent;

  constructor(private layerComponent: VectorComponent) {
  }

  ngOnInit(): void {
      
      this.source = new Vector();

      let features = new WKT().readFeatures(this.wkt, {
          dataProjection: this.dataProjection,
          featureProjection: this.featureProjection,
          extent: this.extent
      });

      this.source.addFeatures(features);
      
      this.layerComponent.layer.setSource(this.source);
  }
}
