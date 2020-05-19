import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { ProjectionLike } from 'ol/proj';
import { BaseInteractionComponent } from '../base-interaction-component';
import { DragAndDrop } from 'ol/interaction';
import { GPX, GeoJSON, KML, TopoJSON } from 'ol/format';
import { MapComponent } from '../../b3-ol-map.component';
import { UuidGenerator } from '../../helper';
import { LayerContainerService } from '../../layers/layer-container.service';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

@Component({
    selector: 'b3-drag-and-drop',
    templateUrl: './drag-and-drop.component.html',
    styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent extends BaseInteractionComponent implements OnInit, OnDestroy {

    @Input() formatConstructors: any[];
    @Input() projection: ProjectionLike;
    @Input() target?: HTMLElement;

    @Output() outDragAndDrop = new EventEmitter<Feature<Geometry>[]>();

    constructor(private mapComponent: MapComponent, private uuidGenerator: UuidGenerator, private layerContainerService: LayerContainerService) {
        super(mapComponent);
    }

    ngOnInit() {

        let formatMap = {
            "GPX": GPX,
            "KML": KML,
            "GeoJSON": GeoJSON,
            "TopoJSON": TopoJSON
        };

        let formats = this.formatConstructors ? this.formatConstructors.map(item => formatMap[item]) : [GeoJSON, KML];

        this.interaction = new DragAndDrop({
            projection: this.projection,
            formatConstructors: formats,
            target: this.target
        });

        this.interaction.on('addfeatures', (event: any) => {

            event.features.forEach((feature: Feature) => {
                feature.getGeometry().transform(this.projection || "EPSG:4326", this.mapComponent.map.getView().getProjection().getCode());
            })

            let layer = {
                "id": this.uuidGenerator.uuidv4(),
                "order": null,
                "type": "vector",
                "name": event.file.name,
                "showOnLayerView": true,
                "isBase": false,
                "sourceSettings": {
                    "type": "feature",
                    "features": event.features
                }
            }

            this.layerContainerService.addLayer(layer);

            this.outDragAndDrop.emit(event.features);
        });

        super.ngOnInit();
    }

    ngOnDestroy() {
        this.mapComponent.map.removeInteraction(this.interaction);
    }
}
