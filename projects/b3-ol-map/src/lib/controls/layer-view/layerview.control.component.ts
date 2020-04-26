import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
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

    }

    constructor(private mapComponent: MapComponent) {
        this.mapComponent.map.getLayers().on("add", (event: CollectionEvent<BaseLayer>) => {
            let order = event.element.get("order")
                ? event.element.get("order")
                : this.mapComponent.map.getLayers().getLength();

            let name = event.element.get("name") 
                ? event.element.get("name")
                : "New Layer - " + order;

            let showOnLayerView = event.element.get("showOnLayerView") !== false;
            
            if(showOnLayerView){
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
            this.nodes.splice(this.nodes.findIndex(s => s.layer === event.element), 1);
        });
    }

    toggle() {
        this.visibility = !this.visibility;
    }

    getNodes(): LayerNode[] {
        return this.nodes.sort((a, b) => a.order > b.order ? 1 : -1);
    }

    onLayerDeleted(layer: BaseLayer) {
        this.outLayerDelete.emit(layer);
    }
}