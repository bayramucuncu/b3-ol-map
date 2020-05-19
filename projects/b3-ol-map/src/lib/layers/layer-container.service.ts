import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayerContainerService {

  private layersBehaviour: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  
  layers$ = this.layersBehaviour.asObservable();

  constructor() { }

  addLayer(layer: any) {
    layer && this.layersBehaviour.next([...this.layersBehaviour.value, layer]);
  }

  addLayers(layers: any[]) {
    layers && this.layersBehaviour.next([...this.layersBehaviour.value, ...layers]);
  }

  removeLayer(layer: any) {
    this.layersBehaviour.next([...this.layersBehaviour.value.filter(item => item !== layer)]);
  }
}
