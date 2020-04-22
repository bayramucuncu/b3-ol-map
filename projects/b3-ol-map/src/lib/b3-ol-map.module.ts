import { NgModule } from '@angular/core';
import { MapComponent } from './b3-ol-map.component';
import { RouterModule } from '@angular/router';
import { LayerTileComponent } from './layers/layer-tile/layer-tile.component';
import { MouseWheelZoomComponent } from './interactions/mouse-wheel-zoom/mouse-wheel-zoom.component';
import { LayerVectorComponent } from './layers/layer-vector/layer-vector.component';
import { LayerImageComponent } from './layers/layer-image/layer-image.component';
import { LayerHeatmapComponent } from './layers/layer-heatmap/layer-heatmap.component';
import { LayerGroupComponent } from './layers/layer-group/layer-group.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    MapComponent, 
    LayerTileComponent, 
    MouseWheelZoomComponent, 
    LayerVectorComponent, 
    LayerImageComponent, 
    LayerHeatmapComponent, 
    LayerGroupComponent, 
    ViewComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    MapComponent, 
    LayerTileComponent, 
    MouseWheelZoomComponent, 
    LayerVectorComponent, 
    LayerImageComponent, 
    LayerHeatmapComponent, 
    LayerGroupComponent, 
    ViewComponent
  ]
})
export class B3OlMapModule { }
