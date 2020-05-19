import { Component, Output, EventEmitter, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { GeoJSON, EsriJSON, TopoJSON, WKT } from 'ol/format';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { MapComponent } from '../../b3-ol-map.component';
import { LayerContainerService } from '../../layers/layer-container.service';
import { UuidGenerator } from '../../helper';

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
    selector: 'b3-data-view',
    styleUrls: ["./dataview.control.component.css"],
    templateUrl: "./dataview.control.component.html",
    encapsulation: ViewEncapsulation.None
})
export class DataViewComponent implements OnInit {

    @Input() title: string;
    @Input() projections: any[];

    visibility: boolean;
    model: MapData;

    @Output() outDataViewFeatureAdd: EventEmitter<Feature[]> = new EventEmitter<Feature[]>();

    constructor(private mapComponentControl: MapComponent, private uuidGenerator: UuidGenerator, private layerContainerService: LayerContainerService) {

    }

    ngOnInit(): void {
        !this.title && (this.title = "Data");
        !this.projections && (this.projections = this.getDefaultProjections());
    }

    formats: any[] = [
        "GeoJSON",
        "EsriJSON",
        "TopoJSON",
        "WKT"
    ];

    private getDefaultProjections(): any {
        return [
            { code: "EPSG:4326" },
            { code: "EPSG:3857" },
            { code: "EPSG:5254" }
        ];
    }

    private getFeatures() {
        let features: any[];

        let readOptions: any = {
            dataProjection: this.model.srid,
            featureProjection: this.mapComponentControl.map.getView().getProjection().getCode()
        };

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

        return features;
    }

    toggle(): void {
        this.visibility = !this.visibility;
        this.model = new MapData(this.projections[0].code, this.formats[0], "", "");
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