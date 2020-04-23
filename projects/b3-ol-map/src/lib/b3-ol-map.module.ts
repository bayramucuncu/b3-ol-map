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
import { DragPanComponent } from './interactions/drag-pan/drag-pan.component';
import { DragAndDropComponent } from './interactions/drag-and-drop/drag-and-drop.component';
import { DoubleClickComponent } from './interactions/double-click/double-click.component';
import { DragAndRotateComponent } from './interactions/drag-and-rotate/drag-and-rotate.component';
import { PinchRotateComponent } from './interactions/pinch-rotate/pinch-rotate.component';
import { KeyboardPanComponent } from './interactions/keyboard-pan/keyboard-pan.component';
import { KeyboardZoomComponent } from './interactions/keyboard-zoom/keyboard-zoom.component';


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
    PinchZoomComponent,
    DragPanComponent,
    DragAndDropComponent,
    DoubleClickComponent,
    DragAndRotateComponent,
    PinchRotateComponent,
    KeyboardPanComponent,
    KeyboardZoomComponent
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
    PinchZoomComponent,
    DragPanComponent,
    DragAndDropComponent,
    DoubleClickComponent,
    DragAndRotateComponent,
    PinchRotateComponent,
    KeyboardPanComponent,
    KeyboardZoomComponent
  ]
})
export class B3OlMapModule { }
