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
        layerContainerService.layers$.subscribe(items => this.layers = items);
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