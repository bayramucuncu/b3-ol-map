import { Component, OnInit, Input } from '@angular/core';
import { Vector } from 'ol/source';
import { ProjectionLike } from 'ol/proj';
import { Extent } from 'ol/extent';
import { WKT } from 'ol/format';
import { VectorComponent } from '../../layers/vector/vector.component';
import { MapComponent } from '../../b3-ol-map.component';

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

  constructor(private layerComponent: VectorComponent, private mapComponent: MapComponent) {
  }

  ngOnInit(): void {
      
      this.source = new Vector();
      
      const projection = this.mapComponent.map.getView().getProjection();

      const features = new WKT().readFeatures(this.wkt, {
          dataProjection: this.dataProjection || projection,
          featureProjection: this.featureProjection || projection,
          extent: this.extent
      });

      this.source.addFeatures(features);
      
      this.layerComponent.layer.setSource(this.source);
  }
}
