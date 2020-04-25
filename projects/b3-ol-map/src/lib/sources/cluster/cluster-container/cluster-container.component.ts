import { Component, OnInit, AfterContentInit, Input, ContentChild, Host } from '@angular/core';
import { Cluster } from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { ClusterComponent } from '../cluster.component';
import { VectorComponent } from '../../../layers/vector/vector.component';

@Component({
  selector: 'b3-source-cluster-container',
  templateUrl: './cluster-container.component.html',
  styleUrls: ['./cluster-container.component.css']
})
export class ClusterContainerComponent implements AfterContentInit {
  source: Cluster;

  @Input() distance: number;
  @Input() geometryFunction?: ((feature: Feature) => Point);

  @ContentChild(ClusterComponent, { static: false }) sourceVectorComponent?: ClusterComponent;

  constructor(@Host() private layerComponent: VectorComponent) {
  }

  ngAfterContentInit() {

      this.source = new Cluster({ 
          source: this.sourceVectorComponent.source,
          distance: this.distance
      });
      
      this.layerComponent.layer.setSource(this.source);
  }
}
