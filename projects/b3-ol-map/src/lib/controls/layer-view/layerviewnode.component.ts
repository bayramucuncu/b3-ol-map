import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LayerNode } from './layer-node';
import BaseLayer from 'ol/layer/Base';

@Component({
  selector: 'b3-layer-view-node',
  styleUrls: ["./layerview.control.component.css"],
  templateUrl: "./layerviewnode.component.html",
})
export class LayerViewNodeComponent {
  @Input() nodes: LayerNode[];
  @Output() outLayerDelete: EventEmitter<BaseLayer> = new EventEmitter<BaseLayer>();

  constructor(){
  }

  getOpacity(node: LayerNode) {
    return node.layer.getOpacity() * 100;
  }

  onCheckChanged(node: LayerNode) {
    let visibility = node.layer.getVisible();

    node.layer.setVisible(!visibility);
  }

  isChecked(node: LayerNode) {
    return node.layer.getVisible();
  }

  onRangeChanged(node: LayerNode, opacity: number) {
    node.layer.setOpacity(opacity / 100);
  }

  toggleSettings(node: any){
    node.isSettingsOpen = !node.isSettingsOpen;
  }

  isLoading(node: LayerNode) {
    return node.layer.get("isLoading");
  }

  delete(node: LayerNode){
    this.outLayerDelete.emit(node.layer);    
  }

  dropTask(targetLabel: string, sourceLabel: string) {

    let source = this.nodes.find(s => s.label == sourceLabel);
    let target = this.nodes.find(s => s.label == targetLabel);

    let sourceIndex = {...source}.order;
    let targetIndex = {...target}.order;
    
    source.layer.setZIndex(targetIndex);
    target.layer.setZIndex(sourceIndex);

    source.order = targetIndex;
    target.order = sourceIndex;

    source.layer.set("order", targetIndex);
    target.layer.set("order", sourceIndex);
  }

  onRangeMouseDown(event:any){
    event.target.parentElement.draggable = false;
  }

  onRangeMouseUp(event:any){
    event.target.parentElement.draggable = true;
  }
}
