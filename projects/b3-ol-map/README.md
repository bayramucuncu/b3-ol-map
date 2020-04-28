# b3-ol-map
Openlayers based Angular library.

## installation

```shell
npm install b3-ol-map
```

After all dependencies installed, open your angular.json and add openlayers css style file.

```json
  "styles": [
    "./node_modules/ol/ol.css",
    "src/styles.css"
  ]
```

## Basic usage

If you does not set any options, the map will apply default settings.

```html
<b3-ol-map>
    <b3-view ></b3-view>
</b3-ol-map>
```

## Map Options
You can set basic map options like following:

app.component.ts

```typescript
export class AppComponent {
  title = 'b3-ol-map';

  public map: any = {
    settings: { width: "100vw", height: "100vh" },
    view: { zoom: 14, center: [4364549.537769296, 5001346.4204131],  projection: "EPSG:3857", minZoom: 0, maxZoom: 26 }
  }
}
```

app.component.html

```html
<div style="width: 100vw; height: 100vh;">
    <b3-ol-map [width]="map.settings.width" [height]="map.settings.height">
        <b3-view [zoom]="map.view.zoom" [center]="map.view.center" [projection]="map.view.projection" [minZoom] ="map.view.minZoom" [maxZoom] ="map.view.maxZoom" ></b3-view>
    </b3-ol-map>
</div>
```


## Interactions
If you do not set the interactions, default interactions are 
- DragPan, 
- DoubleClickZoom
- PinchZoom
- PinchRotate
- MouseWheelZoom

app.component.ts

```typescript
export class AppComponent {
  title = 'b3-ol-map';

  public map: any = {
    settings: { width: "100vw", height: "100vh" },
    view: { zoom: 14, center: [4364549.537769296, 5001346.4204131],
    interactions: [
        { name: "dragpan", title: "Drag pan" },
        { name: "dragandrotate", title: "Drag and rotate", settings: { duration: 250 } }
    ]
  }
}
```

app.component.html
```html
<b3-ol-map [width]="map.settings.width" [height]="map.settings.height">
    <b3-view [zoom]="map.view.zoom" [center]="map.view.center" [projection]="map.view.projection" [minZoom] ="map.view.minZoom" [maxZoom] ="map.view.maxZoom" ></b3-view>
    <b3-interaction-container [interactions]="map.interactions"></b3-interaction-container>
</b3-ol-map>
```

## Projections
If you do not set the projections, default interactions array is empty. 

app.component.ts
```typescript
export class AppComponent {
  title = 'b3-ol-map';

  public map: any = {
    settings: { width: "100vw", height: "100vh" },
    view: { zoom: 14, center: [4364549.537769296, 5001346.4204131],  projection: "EPSG:3857", minZoom: 0, maxZoom: 26 },
    interactions: [
        { name: "dragpan", title: "Drag pan" },
        { name: "dragandrotate", title: "Drag and rotate", settings: { duration: 250 } }
    ]
  }
}
```

app.component.html
```html
<b3-ol-map [width]="map.settings.width" [height]="map.settings.height">
    <b3-view [zoom]="map.view.zoom" [center]="map.view.center" [projection]="map.view.projection" [minZoom] ="map.view.minZoom" [maxZoom] ="map.view.maxZoom" ></b3-view>
    <b3-interaction-container [interactions]="map.interactions"></b3-interaction-container>
    <b3-projection-container [projections]="map.projections"></b3-projection-container>
</b3-ol-map>
```

## Layers
OSM map is default layer of map opject.

app.component.ts
```typescript
export class AppComponent {
  title = 'b3-ol-map';

  public map: any = {
    settings: { width: "100vw", height: "100vh" },
    view: { zoom: 14, center: [4364549.537769296, 5001346.4204131],  projection: "EPSG:3857", minZoom: 0, maxZoom: 26 },
    interactions: [
        { name: "dragpan", title: "Drag pan" },
        { name: "dragandrotate", title: "Drag and rotate", settings: { duration: 250 } }
    ],
    layers:[
      { id: "51c65b72-bc59-4a4f-9b86-ac8309728f1c", order: 1, type: "tile", showOnLayerView: true, name: "Open Street Map", isBase: true, layerSettings: { "visible": true }, sourceSettings: { type: "osm" } },
    ]
  }
}
```

app.component.html
```html
<b3-ol-map [width]="map.settings.width" [height]="map.settings.height">
    <b3-view [zoom]="map.view.zoom" [center]="map.view.center" [projection]="map.view.projection" [minZoom] ="map.view.minZoom" [maxZoom] ="map.view.maxZoom" ></b3-view>
    <b3-interaction-container [interactions]="map.interactions"></b3-interaction-container>
    <b3-projection-container [projections]="map.projections"></b3-projection-container>
    <b3-layer-container [layers]="map.layers"></b3-layer-container>
</b3-ol-map>
```

## Route Parameters
If you want to pan your map to a lon/lat position, you can use ActivatedRoute object of Angular.

```typescript
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params["lon"] && params["lat"]){
        let coordinates = [parseFloat(params["lon"]),parseFloat(params["lat"])];
        let destinationProj = (this.map.view && this.map.view.projection) || "EPSG:3857";
        let sourceProj = "EPSG:4326";
        (this.map.view) && (this.map.view.center = transform(coordinates, sourceProj, destinationProj));
      }
    });
  }
```
transform() is an Openlayers function that located in 'ol/proj'