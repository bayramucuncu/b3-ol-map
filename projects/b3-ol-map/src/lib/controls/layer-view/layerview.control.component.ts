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
            this.layers = items.sort((a, b) => a.order - b.order);
        });
    }

    ngOnInit(): void {
        // setTimeout(() => {
        //     this.layers.sort((a, b) => a.name - b.name)
        // }, 3000);
    }

    toggle() {
        this.visibility = !this.visibility;
    }

    onLayerDeleted(layer: any) {
        this.layerContainerService.removeLayer(layer);
        this.outLayerDelete.emit(layer);
    }

    onLayerOrderChanged(event: any) {
        
        let sourceOrder = {...this.layers.find(f => f.id === event.sourceLayer.id)}.order;
        let targetOrder = {...this.layers.find(f => f.id === event.targetLayer.id)}.order;

        console.log(sourceOrder)
        console.log(targetOrder)
        
        this.layers.find(f => f.id === event.targetLayer.id).order = sourceOrder;
        this.layers.find(f => f.id === event.sourceLayer.id).order = targetOrder;

        this.layers.sort((a, b) => a.order - b.order)
    }
}