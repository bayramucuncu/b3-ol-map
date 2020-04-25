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
        { "id": "51c55bd2-bc19-4a4f-9b86-ac8309728f1c", "order": 10, "type": "vector", "name": "Points Geojson Circle Style", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 20, "visible": true }, "sourceSettings": { "type": "geojson", "url":"https://gisservices.isu.gov.tr/arcgis/rest/services/Altyapilar/Icmesuyu/MapServer/10/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson", "dataProjection":"EPSG:4326", "featureProjection":"EPSG:3857" }, "styleSettings":  { "viewType": "unique", "viewOptions": { "image": { "type": "circle", "options": { "radius":6, "fill": { "color": "rgba(57,  157, 204, 0.7)" }, "stroke": { "color": "rgba(60, 204, 157, 0.9)", "width": 2,"lineCap": "round", "lineJoin": "round","lineDash": null,"lineDashOffset": 0, "miterLimit":10 } } }, "text": { "fill": {"color": "#000" }, "stroke": { "color": "#fff" }, "font": "12px sans-serif", "maxResolution": 4, "propertyName": "objectid" } } } },
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
