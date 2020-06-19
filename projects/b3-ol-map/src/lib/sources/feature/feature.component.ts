import { Component, OnInit, Input } from '@angular/core';
import { Vector } from 'ol/source';
import Feature from 'ol/Feature';
import { VectorComponent } from '../../layers/vector/vector.component';

@Component({
  selector: 'b3-source-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {

  source: Vector;
  
  @Input() features: Feature[];

  constructor(private layerComponent: VectorComponent) {
  }

  ngOnInit(): void {

      this.source = new Vector({features: this.features});

      this.layerComponent.layer.setSource(this.source);
  }
}