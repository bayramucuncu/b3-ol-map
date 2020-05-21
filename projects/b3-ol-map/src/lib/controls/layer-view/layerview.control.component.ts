import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import BaseLayer from 'ol/layer/Base';
import { LayerContainerService } from '../../layers/layer-container.service';

@Component({
    selector: 'b3-layer-view-control',
    templateUrl: "./layerview.control.component.html",
    styleUrls: ["./layerview.control.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class LayerViewControlComponent implements OnInit {

    @Input() title: string;

    @Output() outLayerDelete: EventEmitter<BaseLayer> = new EventEmitter<BaseLayer>();

    layers: any[] = [];

    visibility: boolean;

    constructor(private layerContainerService: LayerContainerService) {
        layerContainerService.layers$.subscribe(items => {
            let sortedLayers = this.sortLayers(items);// layerservice
            this.addLayers(sortedLayers); // items changed, so issue occured.
        });
    }

    private addLayers(items: any[]) {
        items.forEach((item: any) => {
            let found = this.layers.find((f: any) => f.id === item.id);
            !found && this.layers.push(item);
        });
    }

    private sortLayers(items: any[]) {
        // todo: if order not set ??

        let baseLayers = items.filter(a => a.isBase).sort((a, b) => a.order - b.order);
        let otherLayers = items.filter(a => !a.isBase).sort((a, b) => a.order - b.order);

       return [...baseLayers, ...otherLayers];
    }

    ngOnInit(): void { }

    toggle() {
        this.visibility = !this.visibility;
    }

    onLayerDeleted(layer: any) {
        this.layerContainerService.removeLayer(layer);
        this.outLayerDelete.emit(layer);
    }
}