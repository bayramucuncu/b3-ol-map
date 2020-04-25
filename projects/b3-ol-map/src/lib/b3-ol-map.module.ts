import { NgModule } from '@angular/core';
import { MapComponent } from './b3-ol-map.component';
import { RouterModule } from '@angular/router';
import { LayerTileComponent } from './layers/tile/tile.component';
import { MouseWheelZoomComponent } from './interactions/mouse-wheel-zoom/mouse-wheel-zoom.component';
import { VectorComponent } from './layers/vector/vector.component';
import { ImageComponent } from './layers/image/image.component';
import { HeatmapComponent } from './layers/heatmap/heatmap.component';
import { LayerGroupComponent } from './layers/group/group.component';
import { ViewComponent } from './view/view.component';
import { InteractionContainerComponent } from './interactions/interaction-container.component';
import { CommonModule } from '@angular/common';
import { PinchZoomComponent } from './interactions/pinch-zoom/pinch-zoom.component';
import { DragPanComponent } from './interactions/drag-pan/drag-pan.component';
import { DragAndDropComponent } from './interactions/drag-and-drop/drag-and-drop.component';
import { DoubleClickComponent } from './interactions/double-click/double-click.component';
import { DragAndRotateComponent } from './interactions/drag-and-rotate/drag-and-rotate.component';
import { PinchRotateComponent } from './interactions/pinch-rotate/pinch-rotate.component';
import { KeyboardPanComponent } from './interactions/keyboard-pan/keyboard-pan.component';
import { KeyboardZoomComponent } from './interactions/keyboard-zoom/keyboard-zoom.component';
import { DragZoomComponent } from './interactions/drag-zoom/drag-zoom.component';
import { ProjectionComponent } from './projection/projection.component';
import { ProjectionContainerComponent } from './projection/projection-container/projection-container.component';
import { OsmComponent } from './sources/osm/osm.component';
import { LayerContainerComponent } from './layers/layer-container.component';
import { TileWmsComponent } from './sources/tile-wms/tile-wms.component';
import { TileArcgisRestComponent } from './sources/tile-arcgis-rest/tile-arcgis-rest.component';
import { TileWmtsComponent } from './sources/tile-wmts/tile-wmts.component';
import { HttpClientModule } from '@angular/common/http';
import { TopojsonComponent } from './sources/topojson/topojson.component';


@NgModule({
  declarations: [
    MapComponent, 
    LayerTileComponent, 
    VectorComponent, 
    ImageComponent, 
    HeatmapComponent, 
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
    KeyboardZoomComponent,
    DragZoomComponent,
    ProjectionComponent,
    ProjectionContainerComponent,
    OsmComponent,
    LayerContainerComponent,
    TileWmsComponent,
    TileArcgisRestComponent,
    TileWmtsComponent,
    TopojsonComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule
  ],
  exports: [
    MapComponent, 
    LayerTileComponent, 
    VectorComponent, 
    ImageComponent, 
    HeatmapComponent, 
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
    KeyboardZoomComponent,
    ProjectionComponent,
    ProjectionContainerComponent,
    OsmComponent,
    LayerContainerComponent,
    TileWmsComponent,
    TileArcgisRestComponent,
    TileWmtsComponent,
    TopojsonComponent
  ]
})
export class B3OlMapModule { }
