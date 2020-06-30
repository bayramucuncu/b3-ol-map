import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import BaseLayer from 'ol/layer/Base';
import { LayerContainerService } from '../../layers/layer-container.service';

@Component({
  selector: 'b3-layer-control',
  templateUrl: './layer-control.component.html',
  styleUrls: ['./layer-control.component.css']
})
export class LayerControlComponent implements OnInit {

  @Input() title: string;

  @Output() outLayerDelete: EventEmitter<BaseLayer> = new EventEmitter<BaseLayer>();
  @Input() componentData: any;

  layers: any[];
  visibility: boolean;

  private defaultComponentData: any = {
    settings: {
        title: "Layers"
    }
}

  constructor(private layerContainerService: LayerContainerService) {
      this.componentData = this.componentData || this.defaultComponentData;
      this.componentData.settings = { ...this.defaultComponentData.settings, ...this.componentData.settings }

      layerContainerService.layers$.subscribe(items => {
          this.layers = items.sort((a, b) =>  (b.isBase - a.isBase) || (b.order - a.order));
      });

  }

  ngOnInit(): void { }

  toggle() {
      this.visibility = !this.visibility;
  }

  onLayerDeleted(layer: any) {
      this.layerContainerService.removeLayer(layer);
      this.outLayerDelete.emit(layer);
  }

  onLayerOrderChanged(event: any) {
      const sourceLayer = this.layers.find(f => f.id === event.sourceLayer.id);
      const targetLayer = this.layers.find(f => f.id === event.targetLayer.id);

      let sourceOrder = { ...sourceLayer }.order;
      let targetOrder = { ...targetLayer }.order;

      targetLayer.order = sourceOrder;
      sourceLayer.order = targetOrder;

      this.layers.sort((a, b) => (b.isBase - a.isBase) || (b.order - a.order))
  }

}
