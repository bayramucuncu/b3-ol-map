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
export class DataInsertWidgetComponent implements OnInit , WidgetAggregator {

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

  constructor(private mapComponentControl: MapComponent, private uuidGenerator: UuidGenerator, private layerContainerService: LayerContainerService) {

  }

  ngOnInit(): void {
      !this.widgetData.widgetSettings.title && (this.widgetData.widgetSettings.title = "Data");
      !this.widgetData.widgetSettings.projections && (this.widgetData.widgetSettings.projections = this.getDefaultProjections());
  }

  private getDefaultProjections(): any {
      return [
          { code: "EPSG:4326" },
          { code: "EPSG:3857" },
          { code: "EPSG:5254" }
      ];
  }

  private getFeatures() {
      let features: any[] = [];

      let readOptions: any = {
          dataProjection: this.model.srid,
          featureProjection: this.mapComponentControl.map.getView().getProjection().getCode()
      };

      try {
        switch (this.model.format) {
            case "GeoJSON":
                features = new GeoJSON().readFeatures(JSON.parse(this.model.data), readOptions);
                break;
            case "EsriJSON":
                features = new EsriJSON().readFeatures(JSON.parse(this.model.data), readOptions);
                break;
            case "TopoJSON":
                features = new TopoJSON().readFeatures(JSON.parse(this.model.data), readOptions);
                break;
            case "WKT":
                features = new WKT().readFeatures(this.model.data, readOptions);
                break;
            default:
                console.error("Unknown format for data-view component.");
                break;
        }
      } catch (error) {
        console.error(error);        
      }

      return features;
  }

  toggle(): void {
      this.visibility = !this.visibility;
      this.model = new MapData(this.widgetData.widgetSettings.projections[0].code, this.formats[0], "", "");
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
