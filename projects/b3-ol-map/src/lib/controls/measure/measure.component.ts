import { Component, Output, EventEmitter, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { Vector as VectorSource } from 'ol/source';
import { Draw } from 'ol/interaction';
import { Style, Fill, Stroke, Circle } from 'ol/style';
import { Feature, MapBrowserEvent, } from 'ol';
import { Polygon, LineString, Geometry } from 'ol/geom';
import { getArea, getLength } from 'ol/sphere';
import { unByKey } from 'ol/Observable';
import Overlay from 'ol/Overlay';
import OverlayPositioning from 'ol/OverlayPositioning';
import GeometryType from 'ol/geom/GeometryType';
import { DrawEvent } from 'ol/interaction/Draw';
import { MapComponent } from '../../b3-ol-map.component';

@Component({
    selector: 'b3-measure',
    templateUrl: './measure.component.html',
    styleUrls: ['./measure.component.css'],
})
export class MeasureComponent implements OnInit {
    visibility: boolean;
    source = new VectorSource;
    measureType: GeometryType = GeometryType.POLYGON;
    draw: Draw;

    private helpTooltipElement: HTMLElement;
    private measureTooltipElement: HTMLElement;
    private helpTooltip: Overlay;
    private measureTooltip: Overlay;
    private sketch: Feature;
    private listener: any;
    private pointerMoveHandler: (evt: MapBrowserEvent) => void;

    @Input() id: any;
    @Input() title: string;
    @Input() lengthLabel: string;
    @Input() areaLabel: string;

    @Output() outMeasureCreate: EventEmitter<any>;
    @Output() outMeasureRemove: EventEmitter<any>;

    constructor(private mapComponent: MapComponent, private renderer: Renderer2) {
        this.source = new VectorSource();
        this.outMeasureCreate = new EventEmitter<any>();
        this.outMeasureRemove = new EventEmitter<any>();
    }

    ngOnInit() {
        !this.lengthLabel && (this.lengthLabel = "Length");
        !this.areaLabel && (this.areaLabel = "Area");
        !this.title && (this.title = "Measure");
    }

    private createDrawInteraction() {
        let draw = new Draw({
            source: this.source,
            type: this.measureType,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new Circle({
                    radius: 5,
                    stroke: new Stroke({
                        color: 'rgba(255, 255, 255, 0.7)'
                    }),
                    fill: new Fill({
                        color: 'rgba(255, 204, 51, 1)'
                    })
                })
            })
        });

        draw.on('drawstart', (drawEvent: DrawEvent) => {
            this.source.clear();

            if (!this.measureTooltip)
                this.measureTooltip = this.createMeasureTooltip();

            this.renderer.removeClass(this.measureTooltipElement, "ol-tooltip-static");
            this.renderer.removeClass(this.measureTooltipElement, "ol-tooltip-measure");

            this.sketch = drawEvent.feature;
            let tooltipCoord: any;
            this.listener = this.sketch.getGeometry().on('change', (changeEvent) => {
                var geom = changeEvent.target;
                var output: any;
                if (geom instanceof Polygon) {
                    output = this.formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof LineString) {
                    output = this.formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }

                this.measureTooltipElement.innerHTML = output;
                this.measureTooltip.setPosition(tooltipCoord);
            });
        });

        draw.on('drawend', (evt) => {
            this.renderer.addClass(this.measureTooltipElement, "ol-tooltip");
            this.renderer.addClass(this.measureTooltipElement, "ol-tooltip-static");
            this.measureTooltip.setOffset([0, -7]);
            this.sketch = null;

            unByKey(this.listener);
        });

        return draw;
    }

    toggle(): void {
        this.visibility = !this.visibility;

        if (this.visibility === true) {
            this.outMeasureCreate.emit({
                id: this.id,
                title: this.title,
                source: this.source
            });

            this.helpTooltip = this.createHelpTooltip();
            this.mapComponent.map.addOverlay(this.helpTooltip);
            this.measureTooltip = this.createMeasureTooltip();
            this.mapComponent.map.addOverlay(this.measureTooltip);

            this.pointerMoveHandler = (evt: MapBrowserEvent) => {
                if (evt.dragging) {
                    return;
                }

                var helpMsg = 'Click to start drawing';

                if (this.sketch) {
                    var geom = this.sketch.getGeometry();
                    if (geom instanceof Polygon) {
                        helpMsg = 'Click to continue drawing the polygon';
                    } else if (geom instanceof LineString) {
                        helpMsg = 'Click to continue drawing the line';
                    }
                }

                this.helpTooltipElement.innerHTML = helpMsg;
                this.helpTooltip.setPosition(evt.coordinate);

                this.renderer.removeClass(this.helpTooltipElement, "hidden");
            };

            this.draw = this.createDrawInteraction();
            this.mapComponent.map.addInteraction(this.draw);
            this.mapComponent.map.on("pointermove", this.pointerMoveHandler);
        }
        else {
            this.outMeasureRemove.emit({
                id: this.id
            });

            this.source.clear();
            this.mapComponent.map.removeInteraction(this.draw);
            this.mapComponent.map.un("pointermove", this.pointerMoveHandler);
            this.mapComponent.map.removeInteraction(this.draw);
            this.mapComponent.map.removeOverlay(this.measureTooltip);
            this.mapComponent.map.removeOverlay(this.helpTooltip);
        }
    }

    select(value: any) {
        this.measureType = value === 'LineString'
            ? GeometryType.LINE_STRING
            : GeometryType.POLYGON;

        this.mapComponent.map.removeInteraction(this.draw)
        this.draw = this.createDrawInteraction();
        this.mapComponent.map.addInteraction(this.draw);
    }

    private createHelpTooltip(): Overlay {

        this.helpTooltipElement = this.renderer.createElement("div");
        this.renderer.addClass(this.helpTooltipElement, 'ol-tooltip');
        this.renderer.addClass(this.helpTooltipElement, 'hidden');

        let tooltip = new Overlay({
            element: this.helpTooltipElement,
            offset: [15, 0],
            positioning: OverlayPositioning.CENTER_LEFT
        });

        return tooltip;
    }

    private createMeasureTooltip(): Overlay {

        if (this.measureTooltipElement)
            this.renderer.removeChild(this.measureTooltipElement.parentElement, this.measureTooltipElement);

        this.measureTooltipElement = this.renderer.createElement("div");
        this.renderer.addClass(this.measureTooltipElement, 'ol-tooltip');
        this.renderer.addClass(this.measureTooltipElement, 'ol-tooltip-measure');

        let tooltip = new Overlay({
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: OverlayPositioning.BOTTOM_CENTER
        });

        return tooltip;
    }

    private formatArea(geometry: Geometry): string {
        let area = getArea(geometry);
        let output: string;

        if (area > 10000)
            output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>';
        else
            output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';

        return output;
    }

    private formatLength(geometry: Geometry): string {
        var length = getLength(geometry);
        var output: string;

        if (length > 100)
            output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
        else
            output = (Math.round(length * 100) / 100) + ' ' + 'm';

        return output;
    }

}