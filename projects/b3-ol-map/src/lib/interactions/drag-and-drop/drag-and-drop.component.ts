import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { ProjectionLike } from 'ol/proj';
import { DragAndDrop } from 'ol/interaction';
import { GPX, GeoJSON, KML, TopoJSON } from 'ol/format';
import { UuidGenerator } from '../../helper';
import { MapComponent } from '../../b3-ol-map.component';
import { BaseInteractionComponent } from '../base-interaction-component';
import { LayerContainerService } from '../../layers/layer-container.service';
import Projection from 'ol/proj/Projection';

@Component({
    selector: 'b3-drag-and-drop',
    templateUrl: './drag-and-drop.component.html',
    styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent extends BaseInteractionComponent implements OnInit, OnDestroy {

    @Input() formatConstructors: any[];
    @Input() projection: ProjectionLike;
    @Input() target?: HTMLElement;
    @Input() projections: ProjectionLike[];

    @Output() outDragAndDrop = new EventEmitter<Feature<Geometry>[]>();

    fileName: string;
    selectedProjection: any;
    isModalOpen: boolean = false;
    featuresToImport: Feature[] = [];

    private formatMap: any = {
        "GPX": GPX,
        "KML": KML,
        "GeoJSON": GeoJSON,
        "TopoJSON": TopoJSON
    };

    private getDefaultProjections(): any {
        return [
            { code: "EPSG:4326" },
            { code: "EPSG:3857" },
            { code: "EPSG:5254" }
        ]
    }

    constructor(private mapComponent: MapComponent, private uuidGenerator: UuidGenerator, private layerContainerService: LayerContainerService) {
        super(mapComponent);
    }

    ngOnInit() {
        !this.projections && (this.projections = this.getDefaultProjections());
        !this.projection && (this.projection = "EPSG:4326");
        

        let formats = this.formatConstructors ? this.formatConstructors.map(item => this.formatMap[item]) : [GeoJSON, KML];

        this.interaction = new DragAndDrop({
            target: this.target,
            formatConstructors: formats,
            projection: new Projection({
                code: "dummy"
            })
        });

        this.interaction.on('addfeatures', (event: any) => {
            this.featuresToImport = event.features;
            this.selectedProjection = this.projection;
            this.isModalOpen = true;
            this.fileName = event.file.name;
        });

        super.ngOnInit();
    }

    okModal() {
        this.isModalOpen = false;

        const dataProjection = this.selectedProjection ? this.selectedProjection : (this.projection || "EPSG:4326");
        const mapProjection = this.mapComponent.map.getView().getProjection().getCode();

        this.featuresToImport.forEach((feature: Feature) => feature.getGeometry().transform(dataProjection, mapProjection))

        let layer = {
            "id": this.uuidGenerator.uuidv4(),
            "order": null,
            "type": "vector",
            "name": this.fileName,
            "showOnLayerView": true,
            "isBase": false,
            "sourceSettings": {
                "type": "feature",
                "features": this.featuresToImport
            }
        }

        this.layerContainerService.addLayer(layer);

        this.outDragAndDrop.emit(this.featuresToImport);
    }

    ngOnDestroy() {
        this.mapComponent.map.removeInteraction(this.interaction);
    }
}
