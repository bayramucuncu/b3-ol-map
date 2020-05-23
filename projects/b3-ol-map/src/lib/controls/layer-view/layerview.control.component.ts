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

    layers: any[];
    visibility: boolean;

    constructor(private layerContainerService: LayerContainerService) {
        layerContainerService.layers$.subscribe(items => {
            this.layers = items.sort((a, b) =>  (b.isBase - a.isBase) || (b.order - a.order));
        })
    }

    ngOnInit(): void { }

    toggle() {
        this.visibility = !this.visibility;
    }

    onLayerDeleted(layer: any) {
        this.layerContainerService.removeLayer(layer);
        this.outLayerDelete.emit(layer);
    }

    onLayerOrderChanged(event: any) {
        const sourceLayer = this.layers.find(f => f.id === event.sourceLayer.id);
        const targetLayer = this.layers.find(f => f.id === event.targetLayer.id);

        let sourceOrder = { ...sourceLayer }.order;
        let targetOrder = { ...targetLayer }.order;

        targetLayer.order = sourceOrder;
        sourceLayer.order = targetOrder;

        this.layers.sort((a, b) => (b.isBase - a.isBase) || (b.order - a.order))
    }
}