# b3-ol-map
Openlayers based Angular library.

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


## Default interactions
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
    <b3-interaction-container [interactions]="map.interactions" (outDragAndDrop)="onDragAndDrop($event)"></b3-interaction-container>
</b3-ol-map>
```

## Defalut projections
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
    <b3-interaction-container [interactions]="map.interactions" (outDragAndDrop)="onDragAndDrop($event)"></b3-interaction-container>
    <b3-projection-container [projections]="map.projections"></b3-projection-container>
</b3-ol-map>
```

