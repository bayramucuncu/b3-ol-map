import { BehaviorSubject } from 'rxjs';
import { delay } from "rxjs/operators"

export class LayerContainerService {

  private layersBehaviour: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  layers$ = this.layersBehaviour.asObservable().pipe(delay(0));

  constructor() { }

  addLayer(layer: any) {
    if (!layer) return;

    this.setOrderProperty(layer);
    this.setVisibilityProperty(layer);
    this.setOpacityProperty(layer);

    this.layersBehaviour.next([...this.layersBehaviour.value, layer]);
  }

  addLayers(layers: any[]) {
    if (!layers) return;

    layers.forEach(item => this.addLayer(item));
  }

  removeLayer(layer: any) {
    this.layersBehaviour.next([...this.layersBehaviour.value.filter(item => item !== layer)]);
  }

  removeAllLayers() {
    this.layersBehaviour.next([]);
  }

  private setOrderProperty(layer: any) {
    !layer.order && (layer.order = Math.max(...this.layersBehaviour.value.map(s => s.order)) + 1);
  }

  private setVisibilityProperty(layer: any) {
    layer.layerSettings = layer.layerSettings || {};
    layer.layerSettings.visible = (layer.layerSettings.visible != null || layer.layerSettings.visible != undefined) ? layer.layerSettings.visible : true;
  }

  private setOpacityProperty(layer: any) {
    layer.layerSettings = layer.layerSettings || {};
    layer.layerSettings.opacity = layer.layerSettings.opacity || 1;
  }

}
