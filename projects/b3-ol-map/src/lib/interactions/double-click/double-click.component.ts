import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BaseInteractionComponent } from '../base-interaction-component';
import { DoubleClickZoom } from 'ol/interaction';
import { MapComponent } from '../../b3-ol-map.component';

@Component({
  selector: 'b3-double-click',
  templateUrl: './double-click.component.html',
  styleUrls: ['./double-click.component.css']
})
export class DoubleClickComponent extends BaseInteractionComponent implements OnInit, OnDestroy {
  
  @Input() duration: number;
  @Input() delta: number;
  
  constructor(private mapComponent: MapComponent) {
      super(mapComponent);
  }

  ngOnInit() {
    this.interaction = new DoubleClickZoom({
        duration: this.duration || 250,
        delta: this.delta || 1
    });

    super.ngOnInit(); 
  }

  ngOnDestroy() {
    this.mapComponent.map.removeInteraction(this.interaction);
  }
}