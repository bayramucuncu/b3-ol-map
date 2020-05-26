import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { transform } from 'ol/proj';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'b3-ol-map';
  map: any;

  constructor(private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(params => {
      if(params["lon"] && params["lat"]){
        let coordinates = [parseFloat(params["lon"]),parseFloat(params["lat"])];
        let destinationProj = (this.map.view && this.map.view.projection) || "EPSG:3857";
        let sourceProj = "EPSG:4326";
        (this.map.view) && (this.map.view.center = transform(coordinates, sourceProj, destinationProj));
      }
    });

    this.map = {
      settings: { width: "100%", height: "100%" },
      view: { zoom: 14, center: [3332870.606704303, 4977900.556315189], projection: "EPSG:3857", minZoom: 0, maxZoom: 26 },
      projections: [
        { code: "EPSG:5254", proj4: "+proj=tmerc +lat_0=0 +lon_0=30 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs " }
      ],
      interactions: [
        { name: "dragpan", title: "Drag pan" },
        { name: "draganddrop", title: "Drag and drop", settings: { formatConstructors: ["KML", "GeoJSON", "TopoJSON", "GPX"], projection: "EPSG:5254", target: null } },
        { name: "dragandrotate", title: "Drag and rotate", settings: { duration: 250 } },
        { name: "dragzoom", title: "Drag zoom", settings: { className: "ol-dragbox", minArea: 64, duration: 200, out: false } },
        { name: "doubleclickzoom", title: "Double click", settings: { duration: 250, delta: 1 } },
        { name: "keyboardpan", title: "Keyboard pan", settings: { duration: 100, pixelDelta: 128 } },
        { name: "keyboardzoom", title: "Keyboard zoom", settings: { duration: 100, delta: 1 } },
        { name: "pinchzoom", title: "Pich zoom", settings: { duration: 250 } },
        { name: "pinchrotate", title: "Pich rotate", settings: { duration: 250, threshold: 0.3 } },
        { name: "mousewheelzoom", title: "Mouse wheel interaction", settings: { duration: 250, timeout: 80, useAnchor: true, constrainResolution: false } }
      ],
      layers: [
        { id: "51c65b72-bc59-4a4f-9b86-ac8309728f1c", "order": 1, type: "tile", showOnLayerView: true, name: "Open Street Map", isBase: true, layerSettings: { "visible": true }, sourceSettings: { type: "osm" } },
        { "id": "51c55bd2-bc59-4a4f-9b86-ac8309788f1c", "order": 25, "type": "heatmap", "name": "Points Heatmap Geojson", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 150, "visible": true,  "blur": 15, "radius": 7 }, "sourceSettings": { "type": "geojson", "url":"/assets/points.json", "dataProjection": "EPSG:5254",  "featureProjection":"EPSG:3857" } },
        { "id": "41c55bd2-bc19-4a4f-9b86-ac8309728f1c", "order": 10, "type": "vector", "name": "Points Geojson", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 20, "visible": true }, "sourceSettings": { "type": "geojson", "url":"assets/points.json", "dataProjection":"EPSG:5254", "featureProjection":"EPSG:3857" }, "styleSettings":  { "viewType": "unique", "viewOptions": { "image": { "type": "circle", "options": { "radius":6, "fill": { "color": "rgba(57,  157, 204, 0.7)" }, "stroke": { "color": "rgba(60, 204, 157, 0.9)", "width": 2,"lineCap": "round", "lineJoin": "round","lineDash": null,"lineDashOffset": 0, "miterLimit":10 } } }, "text": { "fill": {"color": "#000" }, "stroke": { "color": "#fff" }, "font": "12px sans-serif", "maxResolution": 4, "propertyName": "objectid" } } } },
      ],
      controls: [
        { "id": "399fe7da-0edc-4021-8811-0e0a786f7547", "name": "fullscreen", "title": "Full Screen Control", "settings": { "tipLabel": "Full Screen" } },
        { "id": "99f1c02b-8c66-488e-881c-247a492951c7", "name": "scaleline", "title": "Scale Control", "settings": { "className": "ol-scale-line", "minWidth": 64, "units": "metric", "bar": false, "steps": 4, "text": false, "target": null } },
        { "id": "99f1c021-8c66-488e-881c-247a492951c7", "name": "zoom", "title": "Zoom Control", "settings": { "duration": 250, "minWidth": 64, "target": null, "units": "metric" } },
        { "id": "399fe7d2-0edc-4021-8811-0e0a786f7547", "name": "zoomslider", "title": "Zoom Slider Control", "settings": { "className": "ol-zoomslider", "duration": 200 } },
        { "id": "399fe7d3-0edc-4021-8811-0e0a786f7547", "name": "zoomtoextent", "title": "Zoom To Extent Control", "settings": { "className": "ol-zoom-extent", "label": "E", "target": null, "tipLabel": "Fit to extent", "extent": [3301963.330562, 4966093.77113,3338023.328904, 4985574.459890] } },
        { "id": "111fe7d3-0edc-4021-8811-0e0a786f7547", "name": "rotate", "title": "Rotate COntrol", "settings": { "className": "ol-rotate", "label": "⇧", "target": null, "tipLabel": "Reset rotation", "duration": 250, "autoHide": true } },
        { "id": "45f1c024-8c67-488e-881c-247a492951c7", "name": "geolocation", "title": "Geolocation" },
        { "id": "99f1c025-8c66-488e-881c-247a492951c7", "name": "mouseposition", "title": "MousePositionControl", "settings": { "precision":"6", "precisionLabel": "Precision", "projection": "EPSG:3857", "projectionLabel": "Projection" }},
        //{ "id": "97f1c024-8c67-488e-881c-247a492951c7", "name": "dataview", "title": "Data" },
        //{ "id": "12f1c024-8c67-488e-881c-247a492951c7", "name": "measure", "title": "Measure", "settings": { "title": "Measure", "lengthLabel": "Length", "areaLabel": "Area", "typeLabel": "Measure Types", "resultLabel": "Result" } },
      ],
      widgets:[
        {"id": "9376830d-98c4-4c3e-b154-79da2c46360c", "widgetComponent": "DataInsertWidgetComponent", "widgetSettings": { "title": "Data" }},
        {"id": "2376830d-98c4-4c3e-b154-79da2c46360c", "widgetComponent": "MeasureWidgetComponent", "widgetSettings": { "title": "Measure", "lengthLabel": "Length", "areaLabel": "Area", "typeLabel": "Measure Types", "resultLabel": "Result" }},
        // {"id": "7376830d-98c4-4c3e-b154-79da2c46360c", "widgetComponent": "SearchComponent", "widgetSettings": { "title": "Data", "position": { "top": "3.2em", "left": "0.5em" } }},
        // {"id": "9d00981d-9823-4318-a237-d52fc8a858b3", "widgetComponent": "MeasureWidgetComponent", "name": "Measure"},
        // {"id": "ec745037-c5d9-4672-967b-6761cf6e0d37", "widgetComponent": "MousePositionWidgetComponent", "name": ""},
        // {"id": "d9f27131-7de2-41a7-b9ca-85a66487d25e", "widgetComponent": "SearchWidgetComponent", "name": ""}
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
    return Math.floor(Math.random() * (max - min)) + min;
  }

  onDragAndDrop(event: any) {
    //console.log(event)
  }

  onLayerCreated(event: any) {
    //console.log("Layer cereated: ", event)
  }
}
