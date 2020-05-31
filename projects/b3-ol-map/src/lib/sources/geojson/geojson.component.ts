import { Component, OnInit, Input, Optional } from '@angular/core';
import { Vector } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { HttpClient } from '@angular/common/http';
import { GeojsonResponseAcceptedSource } from '../base-vector-source';
import { VectorComponent } from '../../layers/vector/vector.component';
import { HeatmapComponent } from '../../layers/heatmap/heatmap.component';
import { MapComponent } from '../../b3-ol-map.component';

@Component({
    selector: 'b3-source-geojson',
    templateUrl: './geojson.component.html',
    styleUrls: ['./geojson.component.css']
})
export class GeojsonComponent extends GeojsonResponseAcceptedSource implements OnInit {

    source: Vector;

    @Input() geometryName: string;

    constructor(http: HttpClient, private mapComponent: MapComponent,
        @Optional() private layerComponent?: VectorComponent,
        @Optional() private heatmapLayerComponent?: HeatmapComponent) {
        super(http);
    }

    ngOnInit(): void {
        const layer = this.layerComponent
            ? this.layerComponent.layer
            : this.heatmapLayerComponent.layer;

        const projection = this.mapComponent.map.getView().getProjection();

        const format = new GeoJSON({
            dataProjection: this.dataProjection || projection,
            featureProjection: this.featureProjection || projection,
            geometryName: this.geometryName
        });

        this.source = new Vector({
            format: format,
            loader: this.loader(layer)
        });
        
        layer.setSource(this.source);
    }
}