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

  dropTask(targetId: any, sourceId: any) {

    let sourceLayer: any = this.getMapLayer(sourceId);
    let targetLayer: any = this.getMapLayer(targetId);

    if (sourceLayer.get("isBase") === targetLayer.get("isBase")) {
      let sourceOrder = sourceLayer.get("order");
      let targetOrder = targetLayer.get("order");

      sourceLayer.setZIndex(targetOrder);
      targetLayer.setZIndex(sourceOrder);

      sourceLayer.set("order", targetOrder);
      targetLayer.set("order", sourceOrder);
    }

  }

  onRangeMouseDown(event: any) {
    event.target.parentElement.draggable = false;
  }

  onRangeMouseUp(event: any) {
    event.target.parentElement.draggable = true;
  }
}
