import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BaseInteractionComponent } from '../base-interaction-component';
import { MapComponent } from '../../b3-ol-map.component';
import { DoubleClickZoom } from 'ol/interaction';

@Component({
  selector: 'b3-double-click',
  templateUrl: './double-click.component.html',
  styleUrls: ['./double-click.component.css']
})
export class DoubleClickComponent extends BaseInteractionComponent implements OnInit, OnDestroy {
  
  @Input() duration: number = 250;
  @Input() delta: number = 1;
  
  constructor(private mapComponent: MapComponent) {
      super(mapComponent);
  }

  ngOnInit() {
    this.interaction = new DoubleClickZoom({
        duration: this.duration,
        delta: this.delta
    });

    super.ngOnInit(); 
  }

  ngOnDestroy() {
    this.mapComponent.map.removeInteraction(this.interaction);
  }
}