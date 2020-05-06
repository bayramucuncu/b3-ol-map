import { Component, OnInit, Input } from '@angular/core';
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
        { name: "draganddrop", title: "Drag and drop", settings: { formatConstructors: ["KML", "GeoJSON", "TopoJSON", "GPX"], projection: null, target: null } },
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
        { "id": "90c55bd2-bc59-4a4f-9b86-ac8309728f6c", "order": 24, "type": "heatmap", "name": "Heatmap KML", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 10000, "visible": true,  "blur": 15, "radius": 10 }, "sourceSettings": { "type": "kml", "url": "https://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml", "extractStyles": false, "dataProjection": "EPSG:4326",  "featureProjection":"EPSG:3857" } },
        { "id": "51c55bd2-bc59-4a4f-9b86-ac8309788f1c", "order": 25, "type": "heatmap", "name": "Arıza Heatmap Geojson", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 150, "visible": true,  "blur": 15, "radius": 7 }, "sourceSettings": { "type": "geojson", "url":"https://gisservices.isu.gov.tr/arcgis/rest/services/Tests/TestAtiksuBacalari/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson", "dataProjection": "EPSG:4326",  "featureProjection":"EPSG:3857" } },
        { "id": "51c55bd2-bc19-4a4f-9b86-ac8309728f1c", "order": 10, "type": "vector", "name": "Points Geojson Circle Style", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 20, "visible": true }, "sourceSettings": { "type": "geojson", "url":"https://gisservices.isu.gov.tr/arcgis/rest/services/Tests/TestAtiksuBacalari/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson", "dataProjection":"EPSG:4326", "featureProjection":"EPSG:3857" }, "styleSettings":  { "viewType": "unique", "viewOptions": { "image": { "type": "circle", "options": { "radius":6, "fill": { "color": "rgba(57,  157, 204, 0.7)" }, "stroke": { "color": "rgba(60, 204, 157, 0.9)", "width": 2,"lineCap": "round", "lineJoin": "round","lineDash": null,"lineDashOffset": 0, "miterLimit":10 } } }, "text": { "fill": {"color": "#000" }, "stroke": { "color": "#fff" }, "font": "12px sans-serif", "maxResolution": 4, "propertyName": "objectid" } } } },
        // { "id": "59c55bd5-bc59-4a4f-9b86-ac8309728f6c", "order": 27, "type": "tile", "name": "xyz", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 150, "visible": true }, "sourceSettings": { "type": "xyz", "url": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" } },
        // { "id": "50c55bd2-bc59-4a4f-9b86-ac8309728f65", "order": 30, "type": "tile", "name": "Bing Maps", "isBase": false, "layerSettings": { "visible": true }, "sourceSettings": { "type": "bingmaps", "imagerySet":"Aerial", "key": "AsbMLbB-On3Bf9cvRVZr7onKWMINZ797STFS7S38nshA0vdbRP4D_A-deKWrEz2X" } },
        
        // { "id": "90c55bd2-bc59-4a4f-9b86-ac8309728f6c", "order": 24, "type": "heatmap", "name": "Heatmap KML", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 10000, "visible": true,  "blur": 15, "radius": 10 }, "sourceSettings": { "type": "kml", "url": "https://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml", "extractStyles": false, "dataProjection": "EPSG:4326",  "featureProjection":"EPSG:3857" } },
        // { "id": "51c55bd2-bc59-4a4f-9b86-ac8309788f1c", "order": 25, "type": "heatmap", "name": "Arıza Heatmap Geojson", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 150, "visible": true,  "blur": 15, "radius": 7 }, "sourceSettings": { "type": "geojson", "url":"https://gisservices.isu.gov.tr/arcgis/rest/services/Tests/TestAtiksuBacalari/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson", "dataProjection": "EPSG:4326",  "featureProjection":"EPSG:3857" } },
        // { "id": "51c55bd2-bc19-4a4f-9b86-ac8309728f1c", "order": 10, "type": "vector", "name": "Points Geojson Circle Style", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 20, "visible": true }, "sourceSettings": { "type": "geojson", "url":"https://gisservices.isu.gov.tr/arcgis/rest/services/Tests/TestAtiksuBacalari/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson", "dataProjection":"EPSG:5254", "featureProjection":"EPSG:3857" }, "styleSettings":  { "viewType": "unique", "viewOptions": { "image": { "type": "circle", "options": { "radius":6, "fill": { "color": "rgba(57,  157, 204, 0.7)" }, "stroke": { "color": "rgba(60, 204, 157, 0.9)", "width": 2,"lineCap": "round", "lineJoin": "round","lineDash": null,"lineDashOffset": 0, "miterLimit":10 } } }, "text": { "fill": {"color": "#000" }, "stroke": { "color": "#fff" }, "font": "12px sans-serif", "maxResolution": 4, "propertyName": "objectid" } } } },
        // { "id": "59c55bd5-bc59-4a4f-9b86-ac8309728f6c", "order": 27, "type": "tile", "name": "xyz", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 150, "visible": true }, "sourceSettings": { "type": "xyz", "url": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" } },
        // { "id": "50c55bd2-bc59-4a4f-9b86-ac8309728f65", "order": 30, "type": "tile", "name": "Bing Maps", "isBase": false, "layerSettings": { "visible": true }, "sourceSettings": { "type": "bingmaps", "imagerySet":"Aerial", "key": "AsbMLbB-On3Bf9cvRVZr7onKWMINZ797STFS7S38nshA0vdbRP4D_A-deKWrEz2X" } },
        
        // { "id": "90c55bd2-bc59-4a4f-9b86-ac8309728f6c", "order": 24, "type": "heatmap", "name": "Heatmap KML", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 10000, "visible": true,  "blur": 15, "radius": 10 }, "sourceSettings": { "type": "kml", "url": "https://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml", "extractStyles": false, "dataProjection": "EPSG:4326",  "featureProjection":"EPSG:3857" } },
        // { "id": "51c55bd2-bc59-4a4f-9b86-ac8309788f1c", "order": 25, "type": "heatmap", "name": "Arıza Heatmap Geojson", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 150, "visible": true,  "blur": 15, "radius": 7 }, "sourceSettings": { "type": "geojson", "url":"https://gisservices.isu.gov.tr/arcgis/rest/services/Tests/TestAtiksuBacalari/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson", "dataProjection": "EPSG:4326",  "featureProjection":"EPSG:3857" } },
        // { "id": "51c55bd2-bc19-4a4f-9b86-ac8309728f1c", "order": 10, "type": "vector", "name": "Points Geojson Circle Style", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 20, "visible": true }, "sourceSettings": { "type": "geojson", "url":"https://gisservices.isu.gov.tr/arcgis/rest/services/Tests/TestAtiksuBacalari/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson", "dataProjection":"EPSG:5254", "featureProjection":"EPSG:3857" }, "styleSettings":  { "viewType": "unique", "viewOptions": { "image": { "type": "circle", "options": { "radius":6, "fill": { "color": "rgba(57,  157, 204, 0.7)" }, "stroke": { "color": "rgba(60, 204, 157, 0.9)", "width": 2,"lineCap": "round", "lineJoin": "round","lineDash": null,"lineDashOffset": 0, "miterLimit":10 } } }, "text": { "fill": {"color": "#000" }, "stroke": { "color": "#fff" }, "font": "12px sans-serif", "maxResolution": 4, "propertyName": "objectid" } } } },
        // { "id": "59c55bd5-bc59-4a4f-9b86-ac8309728f6c", "order": 27, "type": "tile", "name": "xyz", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 150, "visible": true }, "sourceSettings": { "type": "xyz", "url": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" } },
        // { "id": "50c55bd2-bc59-4a4f-9b86-ac8309728f65", "order": 30, "type": "tile", "name": "Bing Maps", "isBase": false, "layerSettings": { "visible": true }, "sourceSettings": { "type": "bingmaps", "imagerySet":"Aerial", "key": "AsbMLbB-On3Bf9cvRVZr7onKWMINZ797STFS7S38nshA0vdbRP4D_A-deKWrEz2X" } },
        
        // { "id": "90c55bd2-bc59-4a4f-9b86-ac8309728f6c", "order": 24, "type": "heatmap", "name": "Heatmap KML", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 10000, "visible": true,  "blur": 15, "radius": 10 }, "sourceSettings": { "type": "kml", "url": "https://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml", "extractStyles": false, "dataProjection": "EPSG:4326",  "featureProjection":"EPSG:3857" } },
        // { "id": "51c55bd2-bc59-4a4f-9b86-ac8309788f1c", "order": 25, "type": "heatmap", "name": "Arıza Heatmap Geojson", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 150, "visible": true,  "blur": 15, "radius": 7 }, "sourceSettings": { "type": "geojson", "url":"https://gisservices.isu.gov.tr/arcgis/rest/services/Tests/TestAtiksuBacalari/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson", "dataProjection": "EPSG:4326",  "featureProjection":"EPSG:3857" } },
        // { "id": "51c55bd2-bc19-4a4f-9b86-ac8309728f1c", "order": 10, "type": "vector", "name": "Points Geojson Circle Style", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 20, "visible": true }, "sourceSettings": { "type": "geojson", "url":"https://gisservices.isu.gov.tr/arcgis/rest/services/Tests/TestAtiksuBacalari/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson", "dataProjection":"EPSG:5254", "featureProjection":"EPSG:3857" }, "styleSettings":  { "viewType": "unique", "viewOptions": { "image": { "type": "circle", "options": { "radius":6, "fill": { "color": "rgba(57,  157, 204, 0.7)" }, "stroke": { "color": "rgba(60, 204, 157, 0.9)", "width": 2,"lineCap": "round", "lineJoin": "round","lineDash": null,"lineDashOffset": 0, "miterLimit":10 } } }, "text": { "fill": {"color": "#000" }, "stroke": { "color": "#fff" }, "font": "12px sans-serif", "maxResolution": 4, "propertyName": "objectid" } } } },
        // { "id": "59c55bd5-bc59-4a4f-9b86-ac8309728f6c", "order": 27, "type": "tile", "name": "xyz", "isBase": false, "layerSettings": { "minResolution": 0.2, "maxResolution": 150, "visible": true }, "sourceSettings": { "type": "xyz", "url": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" } },
        // { "id": "50c55bd2-bc59-4a4f-9b86-ac8309728f65", "order": 30, "type": "tile", "name": "Bing Maps", "isBase": false, "layerSettings": { "visible": true }, "sourceSettings": { "type": "bingmaps", "imagerySet":"Aerial", "key": "AsbMLbB-On3Bf9cvRVZr7onKWMINZ797STFS7S38nshA0vdbRP4D_A-deKWrEz2X" } },
        
      ],
      controls: [
        { "id": "399fe7da-0edc-4021-8811-0e0a786f7547", "name": "fullscreen", "title": "Full Screen Control", "settings": { "tipLabel": "Full Screen" } },
        { "id": "99f1c02b-8c66-488e-881c-247a492951c7", "name": "scaleline", "title": "Scale Control", "settings": { "className": "ol-scale-line", "minWidth": 64, "units": "metric", "bar": false, "steps": 4, "text": false, "target": null } },
        { "id": "99f1c021-8c66-488e-881c-247a492951c7", "name": "zoom", "title": "Zoom Control", "settings": { "duration": 250, "minWidth": 64, "target": null, "units": "metric" } },
        { "id": "399fe7d2-0edc-4021-8811-0e0a786f7547", "name": "zoomslider", "title": "Zoom Slider Control", "settings": { "className": "ol-zoomslider", "duration": 200 } },
        { "id": "399fe7d3-0edc-4021-8811-0e0a786f7547", "name": "zoomtoextent", "title": "Zoom To Extent Control", "settings": { "className": "ol-zoom-extent", "label": "E", "target": null, "tipLabel": "Fit to extent", "extent": null } },
        { "id": "111fe7d3-0edc-4021-8811-0e0a786f7547", "name": "rotate", "title": "Rotate COntrol", "settings": { "className": "ol-rotate", "label": "⇧", "target": null, "tipLabel": "Reset rotation", "duration": 250, "autoHide": true } },
        { "id": "99f1c025-8c66-488e-881c-247a492951c7", "name": "mouseposition", "title": "MousePositionControl", "settings": { "precision":"6", "precisionLabel": "Precision", "projection": "EPSG:3857", "projectionLabel": "Projection" }},
        { "id": "97f1c024-8c67-488e-881c-247a492951c7", "name": "dataview", "title": "Data" },
        { "id": "45f1c024-8c67-488e-881c-247a492951c7", "name": "geolocation", "title": "Geolocation" },
        { "id": "12f1c024-8c67-488e-881c-247a492951c7", "name": "measure", "title": "Measure", "settings": { "title": "Measure", "lengthLabel": "Length", "areaLabel": "Area" } },

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
