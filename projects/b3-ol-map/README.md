# b3-ol-map
Openlayers based Angular library.

## Basic usage

`app.component.ts

export class AppComponent {
  title = 'b3-ol-map';

  public map: any = {
    settings: { width: "100vw", height: "100vh" },
    view: { zoom: 14, center: [4364549.537769296, 5001346.4204131], projection: "EPSG:3857", minZoom: 0, maxZoom: 26 }
  }
}`

app.component.html

`<div style="width: 100vw; height: 100vh;">
    <b3-ol-map [width]="map.settings.width" [height]="map.settings.height">
        <b3-view [zoom]="map.view.zoom" [center]="map.view.center" [projection]="map.view.projection" [minZoom] ="map.view.minZoom" [maxZoom] ="map.view.maxZoom" ></b3-view>
    </b3-ol-map>
</div>`
