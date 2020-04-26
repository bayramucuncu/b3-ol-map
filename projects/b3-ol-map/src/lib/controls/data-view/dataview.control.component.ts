import { Component, Output, EventEmitter } from '@angular/core';
import { GeoJSON, EsriJSON, TopoJSON, WKT } from 'ol/format';
import { Vector as VectorSource } from 'ol/source';
import { Vector as LayerVector } from 'ol/layer';
import { Feature } from 'ol';
import { MapComponent } from '../../b3-ol-map.component';

export class MapData {
    srid: string;
    format: string;
    data: string;

    constructor(srid: string, format: string, data: string) {
        this.srid = srid;
        this.format = format;
        this.data = data;
    }
}

@Component({
    selector: 'b3-data-view',
    styleUrls: ["./dataview.control.component.css"],
    templateUrl: "./dataview.control.component.html"
})
export class DataViewComponent {

    visibility: boolean;
    layer: LayerVector;
    source = new VectorSource;

    @Output() outDataViewFeatureAdd: EventEmitter<Feature[]> = new EventEmitter<Feature[]>();

    constructor(private mapComponentControl: MapComponent) {
        this.layer = new LayerVector();

        this.layer.set("showOnLayerView", false);
    }

    srids: string[] = [
        "EPSG:4326",
        "EPSG:3857",
        "EPSG:5254"
    ];

    formats: any[] = [
        "GeoJSON",
        "EsriJSON",
        "TopoJSON",
        "WKT"
    ];

    model: MapData = new MapData(this.srids[0], this.formats[0], "");

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
    }

    addToLayer(): void {
        let features = this.getFeatures();

        this.source = new VectorSource({
            features: features
        });

        this.mapComponentControl.map.getView().fit(this.source.getExtent(), {
            minResolution: 5
        });
        
        this.outDataViewFeatureAdd.emit(features);
    }

    cancel(): void {
        this.visibility = false;

        if (this.mapComponentControl.map.getLayers().getArray().find(s => s === this.layer))
            this.mapComponentControl.map.removeLayer(this.layer);
    }
}