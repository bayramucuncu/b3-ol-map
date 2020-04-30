import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LayerNode } from './layer-node';
import { CollectionEvent } from 'ol/Collection';
import BaseLayer from 'ol/layer/Base';
import { MapComponent } from '../../b3-ol-map.component';

@Component({
    selector: 'b3-layer-view-control',
    templateUrl: "./layerview.control.component.html",
    styleUrls: ["./layerview.control.component.css"],
})
export class LayerViewControlComponent implements OnInit {

    @Input() title: string;

    @Output() outLayerDelete: EventEmitter<BaseLayer> = new EventEmitter<BaseLayer>();

    nodes: LayerNode[] = [];
    visibility: boolean;

    ngOnInit(): void {
        this.mapComponent.map.getLayers().on("add", (event: CollectionEvent<BaseLayer>) => {

            let layerOrders = this.mapComponent.map.getLayers().getArray().filter(layer => layer.get("order")).map((o) => <number>o.get("order"));

            let maxOrder = (Math.max(...layerOrders) || this.mapComponent.map.getLayers().getArray().length) + 1;

            let order = event.element.get("order")
                ? event.element.get("order")
                : maxOrder;

            if (!event.element.get("order")) {
                event.element.set("order", maxOrder);
            }

            let name = event.element.get("name")
                ? event.element.get("name")
                : "New Layer - " + order;

            let showOnLayerView = event.element.get("showOnLayerView") !== false;

            if (showOnLayerView) {
                this.nodes.push(new LayerNode(
                    name,
                    order,
                    [],
                    event.element,
                    false
                ));
            }
        });

        this.mapComponent.map.getLayers().on("remove", (event: CollectionEvent<BaseLayer>) => {
            this.nodes = this.nodes.filter(s => s.layer !== event.element);
        });
    }

    constructor(private mapComponent: MapComponent) {
    }

    toggle() {
        this.visibility = !this.visibility;
    }

    getNodes(): LayerNode[] {
        return this.nodes.sort((a, b) => a.order > b.order ? 1 : -1);
    }

    onLayerDeleted(layer: BaseLayer) {
        this.mapComponent.map.removeLayer(layer);

        this.outLayerDelete.emit(layer);
    }
}