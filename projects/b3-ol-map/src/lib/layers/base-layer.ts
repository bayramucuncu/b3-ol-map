import { OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import BaseLayer from 'ol/layer/Base';
import { MapComponent } from '../';
import { LayerGroupComponent } from '../layers';

export abstract class BaseLayerComponent implements OnInit, OnDestroy {

    layer: any;

    @Input() id: string;
    @Input() name: string;
    @Input() order: number;
    @Input() isBase: boolean;
    @Input() showOnLayerView: boolean;
    @Output() outLayerCreate: EventEmitter<BaseLayer>;

    constructor(protected hostComponent: LayerGroupComponent | MapComponent) {
        this.showOnLayerView = true;
        this.outLayerCreate = new EventEmitter<BaseLayer>();
    }

    ngOnInit() {
        this.layer.set("id", this.id);
        this.layer.set("name", this.name);
        this.layer.set("order", this.order);
        this.layer.set("isBase", this.isBase || false);
        this.layer.set("showOnLayerView", this.showOnLayerView); 

        this.isBase === true
            ? this.layer.setZIndex(0) 
            : this.layer.setZIndex(this.order);

        this.hostComponent instanceof MapComponent
            ? this.hostComponent.map.getLayers().push(this.layer)
            : this.hostComponent.layer.getLayers().push(this.layer);

        this.outLayerCreate.emit(this.layer);
    }

    ngOnDestroy(): void {
        this.hostComponent instanceof MapComponent
            ? this.hostComponent.map.removeLayer(this.layer)
            : this.hostComponent.layer.getLayers().remove(this.layer);
    }
}