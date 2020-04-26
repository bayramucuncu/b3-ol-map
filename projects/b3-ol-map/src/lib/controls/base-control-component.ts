import { OnInit, OnDestroy } from '@angular/core';
import { Control } from 'ol/control';
import { MapComponent } from '../b3-ol-map.component';


export abstract class BaseControlComponent implements OnInit, OnDestroy {

  protected control: Control;

  constructor(protected mapControl: MapComponent) { }

  ngOnInit() {
    this.mapControl.map.addControl(this.control);
  }

  ngOnDestroy(): void {
    this.mapControl.map.removeControl(this.control);
  }
}