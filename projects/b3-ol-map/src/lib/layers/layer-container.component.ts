import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import BaseLayer from 'ol/layer/Base';

@Component({
  selector: 'b3-layer-container',
  templateUrl: './layer-container.component.html',
  styleUrls: ['./layer-container.component.css']
})
export class LayerContainerComponent implements OnInit {

  @Input() layers: any[];
  @Input() showControl: boolean;
  @Input() controlTitle: string;

  @Output() outLayerCreate: EventEmitter<BaseLayer>;

  constructor() {
    this.outLayerCreate = new EventEmitter<BaseLayer>();
  }

  ngOnInit() {
    !this.layers && (this.layers = this.getDefaultLayers());
    
    if (this.layers) {
      this.layers = this.layers.sort((a, b) => a.order > b.order ? 1 : -1);
    } else {
      this.layers = this.getDefaultLayers();
    }

    !this.showControl && (this.showControl = false);
    !this.controlTitle && (this.controlTitle = "Layers");
  }

  onLayerCreated($event: any): void {
    this.outLayerCreate.emit($event);
  }

  private getDefaultLayers(): any[] {
    return [
      { id: "51c65b72-bc59-4a4f-9b86-ac8309728f1c", order: 1, type: "tile", showOnLayerView: true, name: "Open Street Map", isBase: true, layerSettings: { "visible": true }, sourceSettings: { type: "osm" } },
    ]
  }

}
