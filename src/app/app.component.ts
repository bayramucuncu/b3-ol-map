import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'b3-ol-map';
  map: any;

  constructor() {
    this.map = {
      settings: { width: "100vw", height: "100vh" },
      view: { zoom: 14, center: [3332870.606704303, 4977900.556315189], projection: "EPSG:3857", minZoom: 0, maxZoom: 26 },
      projections: [
        { code: "EPSG:5254", proj4: "+proj=tmerc +lat_0=0 +lon_0=30 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs " }
      ],
      interactions: [
        { name: "dragpan", title: "Drag pan" },
        { name: "draganddrop", title: "Drag and drop", settings: { formatConstructors: [ "KML", "GeoJSON", "TopoJSON", "GPX"], projection: null, target: null } },
        { name: "dragandrotate", title: "Drag and rotate", settings: { duration: 250 } },
        { name: "dragzoom", title: "Drag zoom", settings: { className: "'ol-dragbox", minArea: 64, duration: 200, out: false } },
        { name: "doubleclickzoom", title: "Double click", settings: { duration: 250, delta: 1 } },
        { name: "keyboardpan", title: "Keyboard pan", settings: { duration: 100, pixelDelta: 128 } },
        { name: "keyboardzoom", title: "Keyboard zoom", settings: { duration: 100, delta: 1 } },
        { name: "pinchzoom", title: "Pich zoom", settings: { duration: 250 } },
        { name: "pinchrotate", title: "Pich rotate", settings: { duration: 250, threshold: 0.3 } },
        { name: "mousewheelzoom", title: "Mouse wheel interaction", settings: { duration: 250, timeout: 80, useAnchor: true, constrainResolution: false } }
      ],
      layers:[
        { id: "51c65b72-bc59-4a4f-9b86-ac8309728f1c", order: 1, type: "tile", showOnLayerView: true, name: "Open Street Map", isBase: true, layerSettings: { "visible": true }, sourceSettings: { type: "osm" } },
        //{ "id": "50c25bd2-bc59-4a4f-9b86-ac8309728f1c", "order": 3, "type": "tile", "name": "Uydu 2018", "isBase": false, "layerSettings": { "minResolution": "0.14", "maxResolution": "200" }, "sourceSettings": { "type": "tilewmts", "url": "https://tileservices.kocaeli.bel.tr/geoserver/gwc/service/wmts", "layer": "kbb:hybrid_v2_group", "matrixSet": "EPSG:900913" } },
        { "id": "50c15bd2-bc59-4a4f-9b86-ac8309728f1c", "order": 2, "type": "tile", "name": "Şehir Haritası", "isBase": false, "layerSettings": { "minResolution": "0.14", "maxResolution": "200" }, "sourceSettings": { "type": "tilewmts", "url": "https://tileservices.kocaeli.bel.tr/geoserver/gwc/service/wmts", "layer": "kbb:wm_carto_v2", "matrixSet": "EPSG:900913" } },
      ]
    }  
  }

  ngOnInit(): void {
    // const ounter = interval(1000);

    // ounter.subscribe( t => {
    //   this.map.view.center = [ 
    //     this.map.view.center[0] + this.getRandonInteger(-1000,1000),
    //     this.map.view.center[1] + this.getRandonInteger(-1000,1000)
    //   ];
    // })
  }

  private getRandonInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  onDragAndDrop(event: any){
    //console.log(event)
  }

  onLayerCreated(event: any) {
    //console.log("Layer cereated: ", event)
  }
}
