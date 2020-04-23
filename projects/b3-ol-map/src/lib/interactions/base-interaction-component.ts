import { OnInit, OnDestroy } from '@angular/core';
import { MapComponent } from '../b3-ol-map.component';
import { Interaction } from 'ol/interaction';

export abstract class BaseInteractionComponent implements OnInit, OnDestroy {
  
  protected interaction: Interaction;

  constructor(protected mapControl: MapComponent) { }
  
  ngOnInit() {
    this.mapControl.map.addInteraction(this.interaction);    
  }
  
  ngOnDestroy(): void {
    this.mapControl.map.removeInteraction(this.interaction);
  }
}
