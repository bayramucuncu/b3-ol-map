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
import { XyzComponent } from './sources/xyz/xyz.component';
import { BingmapsComponent } from './sources/bingmaps/bingmaps.component';
import { ImageWmsComponent } from './sources/image-wms/image-wms.component';
import { ImageArcgisrestComponent } from './sources/image-arcgisrest/image-arcgisrest.component';
import { ImageStaticComponent } from './sources/image-static/image-static.component';
import { KmlComponent } from './sources/kml/kml.component';
import { GeojsonComponent } from './sources/geojson/geojson.component';
import { SignalrComponent } from './sources/signalr/signalr.component';
import { OwnerComponent } from './sources/owner/owner.component';
import { FeatureComponent } from './sources/feature/feature.component';
import { GpxComponent } from './sources/gpx/gpx.component';
import { Gml2Component } from './sources/gml2/gml2.component';
import { Gml3Component } from './sources/gml3/gml3.component';
import { Gml32Component } from './sources/gml32/gml32.component';
import { ClusterComponent } from './sources/cluster/cluster.component';
import { ClusterContainerComponent } from './sources/cluster/cluster-container/cluster-container.component';
import { WktComponent } from './sources/wkt/wkt.component';
import { EsrijsonComponent } from './sources/esrijson/esrijson.component';
import { WfsComponent } from './sources/wfs/wfs.component';
import { FeatureInfoWidgetContainerComponent } from './layers/vector/feature-info-widget-container/feature-info-widget-container.component';
import { FeatureInfoWidgetComponent } from './layers/vector/feature-info-widget/feature-info-widget.component';
import { WidgetHostDirective } from './layers/vector/feature-info-widget-container/widget-host.directive';
import { VectorStyleComponent } from './layers/vector/vector-style/vector-style.component';
import { FullScreenComponent } from './controls/full-screen/full-screen.component';
import { MousePositionComponent } from './controls/mouse-position/mouse-position.component';
import { ScaleLineComponent } from './controls/scale-line/scale-line.component';


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
    TopojsonComponent,
    XyzComponent,
    BingmapsComponent,
    ImageWmsComponent,
    ImageArcgisrestComponent,
    ImageStaticComponent,
    KmlComponent,
    GeojsonComponent,
    SignalrComponent,
    OwnerComponent,
    FeatureComponent,
    GpxComponent,
    Gml2Component,
    Gml3Component,
    Gml32Component,
    ClusterComponent,
    ClusterContainerComponent,
    WktComponent,
    EsrijsonComponent,
    WfsComponent,
    FeatureInfoWidgetContainerComponent,
    FeatureInfoWidgetComponent,
    WidgetHostDirective,
    VectorStyleComponent,
    FullScreenComponent,
    MousePositionComponent,
    ScaleLineComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule
  ],
  entryComponents:[
    FeatureInfoWidgetComponent
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
    TopojsonComponent,
    XyzComponent,
    BingmapsComponent,
    ImageWmsComponent,
    ImageArcgisrestComponent,
    ImageStaticComponent,
    KmlComponent,
    GeojsonComponent,
    SignalrComponent,
    OwnerComponent,
    FeatureComponent,
    GpxComponent,
    Gml2Component,
    Gml3Component,
    Gml32Component,
    ClusterComponent,
    ClusterContainerComponent,
    WktComponent,
    EsrijsonComponent,
    WfsComponent,
    FeatureInfoWidgetContainerComponent,
    FeatureInfoWidgetComponent,
    WidgetHostDirective,
    VectorStyleComponent,
    FullScreenComponent
  ]
})
export class B3OlMapModule { }
