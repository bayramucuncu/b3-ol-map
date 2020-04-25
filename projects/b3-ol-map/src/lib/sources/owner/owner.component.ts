import { Component, OnInit, Input } from '@angular/core';
import { Vector } from 'ol/source';
import { VectorComponent } from '../../layers/vector/vector.component';

@Component({
  selector: 'b3-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  @Input() source: Vector;
  
  constructor(private layerComponent: VectorComponent) {
  }

  ngOnInit(): void {
      this.layerComponent.layer.setSource(this.source);
  }
}
