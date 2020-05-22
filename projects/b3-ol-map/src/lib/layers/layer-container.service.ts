import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayerContainerService {

  private layersBehaviour: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  layers$ = this.layersBehaviour.asObservable();

  constructor() {

   }

  addLayer(layer: any) {
    if (!layer) return;

    this.setOrderProperty(layer);
    this.setVisibilityProperty(layer);
    this.setOpacityProperty(layer);

    let sortedLayers = [...this.layersBehaviour.value, layer]//.sort((a, b) => a.id - b.id);
    this.layersBehaviour.next(sortedLayers);
  }
  
  addLayers(layers: any[]) {
    if (!layers) return;

    layers.forEach(item => this.addLayer(item));
  }

  removeLayer(layer: any) {
    this.layersBehaviour.next([...this.layersBehaviour.value.filter(item => item !== layer)]);
  }

  private setOrderProperty(layer: any) {
    !layer.order && (layer.order = Math.max(...this.layersBehaviour.value.map(s => s.order)));
  }

  private setVisibilityProperty(layer: any){
    layer.layerSettings = layer.layerSettings || {};
    layer.layerSettings.visible = layer.layerSettings.visible || true;
  }

  private setOpacityProperty(layer: any) {
    layer.layerSettings = layer.layerSettings || {};
    layer.layerSettings.opacity = layer.layerSettings.opacity || 1;
  }

}
