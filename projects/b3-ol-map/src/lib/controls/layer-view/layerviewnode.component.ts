import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import BaseLayer from 'ol/layer/Base';
import { MapComponent } from '../../b3-ol-map.component';

@Component({
  selector: 'b3-layer-view-node',
  styleUrls: ["./layerview.control.component.css"],
  templateUrl: "./layerviewnode.component.html",
  encapsulation: ViewEncapsulation.None
})
export class LayerViewNodeComponent implements OnInit {

  @Input() layer: any;

  @Output() outLayerDelete: EventEmitter<BaseLayer>;
  @Output() outLayerOrderChange: EventEmitter<any>;

  isSettingsOpen: boolean = false;

  constructor(private mapComponent: MapComponent) {
    this.outLayerDelete = new EventEmitter<BaseLayer>();
    this.outLayerOrderChange = new EventEmitter<any>();
  }

  ngOnInit(): void { }

  private getMapLayer(id: any) {
    return this.mapComponent.map.getLayers().getArray().find((item: any) => item.get("id") === id);
  }

  private getBasemapLayers() {
    return this.mapComponent.map.getLayers().getArray().filter((item: any) => item.get("isBase") === true);
  }

  onLayerToggle(layer: any) {
    this.layer.layerSettings.visible = !this.layer.layerSettings.visible;

    this.getMapLayer(layer.id).setVisible(this.layer.layerSettings.visible);
  }

  onBasemapToggle(layer: any) {
    this.getBasemapLayers().forEach((item: any) =>  item.get("id") === layer.id ? item.setVisible(true) : item.setVisible(false))
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
      let sourceOrder = { ...source }.order;
      let targetOrder = { ...target }.order;

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
