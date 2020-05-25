import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Feature from 'ol/Feature';
import BaseLayer from 'ol/layer/Base';

@Component({
  selector: 'b3-control-container',
  templateUrl: './control-container.component.html',
  styleUrls: ['./control-container.component.css']
})
export class ControlContainerComponent implements OnInit {

  @Input() controls: any[];
  @Output() outDataViewFeatureAdd: EventEmitter<Feature[]>;
  @Output() outLayerDelete: EventEmitter<BaseLayer>;
  @Output() outMeasureCreate: EventEmitter<any>;
  @Output() outMeasureRemove: EventEmitter<any>;

  constructor() {
    this.outDataViewFeatureAdd = new EventEmitter<Feature[]>();
    this.outLayerDelete = new EventEmitter<BaseLayer>();
    this.outMeasureCreate = new EventEmitter<any>();
    this.outMeasureRemove = new EventEmitter<any>();
  }

  ngOnInit() {
    !this.controls && (this.controls = this.getDefaultControls());

    this.controls.forEach((item: any) => item.panelVisibility = false);
  }

  private getDefaultControls(): any[] {
    return [
      { "name": "zoom", "title": "Zoom Control", "settings": { "duration": 250, "minWidth": 64, "target": null, "units": "metric" } },
    ]
  }

  onDataViewFeatureAded($event: any) {
    this.outDataViewFeatureAdd.emit($event);
  }

  onLayerDeleted($event: any) {
    this.outLayerDelete.emit($event);
  }

  onMeasureCreated($event: any) {
    this.outMeasureCreate.emit($event);
  }

  onMeasureRemoved($event: any) {
    this.outMeasureRemove.emit($event);
  }
}
