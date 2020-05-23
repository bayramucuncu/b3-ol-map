import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import BaseLayer from 'ol/layer/Base';
import { MapComponent } from '../../b3-ol-map.component';

@Component({
  selector: 'b3-layer-view-node',
  styleUrls: ["./layerview.control.component.css"],
  templateUrl: "./layerviewnode.component.html",
})
export class LayerViewNodeComponent implements OnInit {

  @Input() layer: any;

  @Output() outLayerDelete: EventEmitter<BaseLayer> = new EventEmitter<BaseLayer>();
  @Output() outLayerOrderChange: EventEmitter<any> = new EventEmitter<any>();

  isSettingsOpen: boolean = false;

  constructor(private mapComponent: MapComponent) { }

  ngOnInit(): void { }

  private getMapLayer(id: any) {
    return this.mapComponent.map.getLayers().getArray().find((item: any) => item.get("id") === id);
  }

  onCheckChanged(layer: any) {
    this.layer.layerSettings.visible = !this.layer.layerSettings.visible;

    this.getMapLayer(layer.id).setVisible(this.layer.layerSettings.visible);
  }

  onRangeChanged(layer: any) {
    this.getMapLayer(layer.id).setOpacity(this.layer.layerSettings.opacity)
  }

  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
  }

  isLoading(layer: any) {
    return this.getMapLayer(layer.id) && this.getMapLayer(layer.id).get("isLoading");
  }

  delete(layer: any) {
    this.outLayerDelete.emit(layer);
  }

  onDrop(target: any, source: any) {

    let sourceMapLayer: any = this.getMapLayer(source.id);
    let targetMapLayer: any = this.getMapLayer(target.id);

    if (sourceMapLayer.get("isBase") === targetMapLayer.get("isBase")) {
      let sourceOrder = {...source}.order;
      let targetOrder = {...target}.order;

      sourceMapLayer.setZIndex(targetOrder);
      targetMapLayer.setZIndex(sourceOrder);

      this.outLayerOrderChange.emit({
        targetLayer: target,
        sourceLayer: source
      });
    }

  }

  onRangeMouseDown(event: any) {
    event.target.parentElement.draggable = false;
  }

  onRangeMouseUp(event: any) {
    event.target.parentElement.draggable = true;
  }
}
