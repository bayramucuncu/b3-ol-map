import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import { GeoJSON, EsriJSON, TopoJSON, WKT } from 'ol/format';
import { UuidGenerator } from '../../helper';
import { WidgetAggregator } from '../widget-aggregator';
import { MapComponent } from '../../b3-ol-map.component';
import { LayerContainerService } from '../../layers/layer-container.service';

export class MapData {
  srid: string;
  format: string;
  data: string;
  name: string;

  constructor(srid: string, format: string, data: string, name: string) {
    this.srid = srid;
    this.format = format;
    this.data = data;
    this.name = name;
  }
}

@Component({
  selector: 'b3-data-insert-widget',
  templateUrl: './data-insert-widget.component.html',
  styleUrls: ['./data-insert-widget.component.css']
})
export class DataInsertWidgetComponent implements OnInit, WidgetAggregator {

  @Input() widgetData: any = {};
  @Output() outDataViewFeatureAdd: EventEmitter<Feature[]> = new EventEmitter<Feature[]>();

  visibility: boolean;
  model: MapData;
  formats: any[] = [
    "GeoJSON",
    "EsriJSON",
    "TopoJSON",
    "WKT"
  ];

  private defaultWidgetData: any = {
    settings: {
      title: "Data",
      projections: [
        { code: "EPSG:4326" },
        { code: "EPSG:3857" },
        { code: "EPSG:5254" }
      ]
    }
  }

  constructor(private mapComponentControl: MapComponent, private uuidGenerator: UuidGenerator, private layerContainerService: LayerContainerService) { 

  }

  ngOnInit(): void {
    this.widgetData = this.widgetData || this.defaultWidgetData;

    this.widgetData.settings = { ...this.defaultWidgetData.settings, ...this.widgetData.settings }
  }

  private getFeatures() {

    const readOptions: any = {
      dataProjection: this.model.srid,
      featureProjection: this.mapComponentControl.map.getView().getProjection().getCode()
    };

    try {
      switch (this.model.format) {
        case "GeoJSON":
          return new GeoJSON().readFeatures(JSON.parse(this.model.data), readOptions);
        case "EsriJSON":
          return new EsriJSON().readFeatures(JSON.parse(this.model.data), readOptions);
        case "TopoJSON":
          return new TopoJSON().readFeatures(JSON.parse(this.model.data), readOptions);
        case "WKT":
          return new WKT().readFeatures(this.model.data, readOptions);
        default:
          console.error("Unknown format for data-view component.");
          return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  toggle(): void {
    this.visibility = !this.visibility;
    this.model = new MapData(this.widgetData.settings.projections[0].code, this.formats[0], "", "");
  }

  addToLayer(): void {
    let features = this.getFeatures();

    let source = new VectorSource({
      features: features
    });

    let layer = {
      "id": this.uuidGenerator.uuidv4(),
      "order": null,
      "type": "vector",
      "name": this.model.name || "Data Layer",
      "showOnLayerView": true,
      "isBase": false,
      "sourceSettings": {
        "type": "feature",
        "features": features
      }
    }

    this.layerContainerService.addLayer(layer);

    this.mapComponentControl.map.getView().fit(source.getExtent(), { size: this.mapComponentControl.map.getSize() });

    this.outDataViewFeatureAdd.emit(features);
  }
}
