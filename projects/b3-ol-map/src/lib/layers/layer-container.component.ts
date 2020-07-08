import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, IterableDiffers, DoCheck, SimpleChanges, OnChanges } from '@angular/core';
import BaseLayer from 'ol/layer/Base';
import { Observable } from 'rxjs';
import { UuidGenerator } from '../helper';
import { LayerContainerService } from './layer-container.service';

@Component({
  selector: 'b3-layer-container',
  templateUrl: './layer-container.component.html',
  styleUrls: ['./layer-container.component.css']
})
export class LayerContainerComponent implements OnInit, OnDestroy, OnChanges {

  @Input() layers: any[];
  @Input() showControl: boolean;
  @Input() controlTitle: string;

  @Output() outLayerCreate: EventEmitter<BaseLayer>;

  layerContainerService: LayerContainerService;
  layer$: Observable<any[]>;

  constructor(layerContainerService: LayerContainerService, private uuidGenerator: UuidGenerator) {
    this.layerContainerService = layerContainerService;
    this.outLayerCreate = new EventEmitter<BaseLayer>();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.layers.currentValue) {
      this.layers = (this.layers && this.layers.length > 0) ? this.layers : this.getDefaultLayers();
      this.layerContainerService.removeAllLayers();
      this.layerContainerService.addLayers(this.layers);
    }
  }

  ngOnInit() {
    this.layer$ = this.layerContainerService.layers$;

    !this.showControl && (this.showControl = false);
    !this.controlTitle && (this.controlTitle = "Layers");
  }

  ngOnDestroy(): void {
    this.layerContainerService.removeAllLayers();
  }

  onLayerCreated($event: any): void {
    this.outLayerCreate.emit($event);
  }

  private getDefaultLayers(): any[] {
    return [
      { id: this.uuidGenerator.uuidv4(), order: 1, type: "tile", showOnLayerView: true, name: "Open Street Map", isBase: true, layerSettings: { "visible": true }, sourceSettings: { type: "osm" } },
    ]
  }

}
