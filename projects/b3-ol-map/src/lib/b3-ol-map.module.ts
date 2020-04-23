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
import { InteractionContainerComponent } from './interactions/interaction-container/interaction-container.component';
import { CommonModule } from '@angular/common';
import { PinchZoomComponent } from './interactions/pinch-zoom/pinch-zoom.component';


@NgModule({
  declarations: [
    MapComponent, 
    LayerTileComponent, 
    LayerVectorComponent, 
    LayerImageComponent, 
    LayerHeatmapComponent, 
    LayerGroupComponent, 
    ViewComponent, 
    InteractionContainerComponent,
    MouseWheelZoomComponent,
    PinchZoomComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    MapComponent, 
    LayerTileComponent, 
    LayerVectorComponent, 
    LayerImageComponent, 
    LayerHeatmapComponent, 
    LayerGroupComponent, 
    ViewComponent,
    InteractionContainerComponent,
    MouseWheelZoomComponent,
    PinchZoomComponent
  ]
})
export class B3OlMapModule { }
