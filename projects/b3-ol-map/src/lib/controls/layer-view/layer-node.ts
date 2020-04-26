import BaseLayer from 'ol/layer/Base';

export class LayerNode {
    label: string;
    order: number;
    children: LayerNode[];
    layer: BaseLayer;
    isSettingsOpen: boolean;

    constructor(label: string, order: number, children: LayerNode[], layer: BaseLayer, isSettingsOpen: boolean){
        this.label = label;
        this.order = order;
        this.children = children;
        this.layer = layer;
        this.isSettingsOpen = isSettingsOpen;
    }
}