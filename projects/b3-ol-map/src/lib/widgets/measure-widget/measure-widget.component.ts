import { Component, Output, EventEmitter, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Vector, Heatmap } from 'ol/layer';
import { Draw, Snap } from 'ol/interaction';
import CircleStyle from 'ol/style/Circle';
import GeometryType from 'ol/geom/GeometryType';
import { Vector as VectorSource } from 'ol/source';
import { Style, Fill, Stroke, Circle } from 'ol/style';
import { MapComponent } from '../../b3-ol-map.component';
import { WidgetAggregator } from '../widget-aggregator';
import { Collection, Feature } from 'ol';

@Component({
    selector: 'b3-measure-widget',
    templateUrl: './measure-widget.component.html',
    styleUrls: ['./measure-widget.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MeasureWidgetComponent implements OnInit, WidgetAggregator {

    visibility: boolean;
    result: string;
    measureType: GeometryType = GeometryType.LINE_STRING;
    source = new VectorSource;
    vectorLayer = new Vector({
        source: new VectorSource(),
        style: new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.4)'
            }),
            stroke: new Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({
                    color: '#ffcc33'
                })
            })
        })
    });

    snap: Snap;

    private measuringTool: Draw;
    private defaultWidgetData: any = {
        widgetSettings: {
            title: "Measure",
            lengthLabel: "Length",
            areaLabel: "Area",
            typeLabel: "Measure Types",
            resultLabel: "Result"
        }
    }

    @Input() widgetData: any;

    @Input() lengthLabel: string;
    @Input() areaLabel: string;
    @Input() typeLabel: string;
    @Input() resultLabel: string;

    @Output() outMeasureCreate: EventEmitter<any>;
    @Output() outMeasureRemove: EventEmitter<any>;

    constructor(private mapComponent: MapComponent) {
        this.source = new VectorSource();
        this.outMeasureCreate = new EventEmitter<any>();
        this.outMeasureRemove = new EventEmitter<any>();
    }

    ngOnInit() {
        this.widgetData = this.widgetData || this.defaultWidgetData;

        this.widgetData.widgetSettings = { ...this.defaultWidgetData.widgetSettings, ...this.widgetData.widgetSettings }
    }

    private enableMeasuringTool() {
        this.mapComponent.map.removeInteraction(this.measuringTool);
        this.mapComponent.map.removeInteraction(this.snap);
        this.result = undefined;
        this.vectorLayer.getSource().clear();

        this.snap = new Snap({
            features: this.getFeatures()
        });

        this.measuringTool = new Draw({
            type: this.measureType,
            source: this.vectorLayer.getSource(),
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

        this.measuringTool.on('drawstart', (measureEvent: any) => {

            this.vectorLayer.getSource().clear();

            measureEvent.feature.on('change', (changeEvent: any) => {
                var measurement = this.measureType === 'Polygon'
                    ? changeEvent.target.getGeometry().getArea()
                    : changeEvent.target.getGeometry().getLength();

                var devideBy = this.measureType === 'Polygon' ? 1000000 : 1000;

                var measurementFormatted = measurement >= devideBy
                    ? (measurement / devideBy).toFixed(2) + ' km'
                    : measurement.toFixed(2) + ' m';

                this.result = measurementFormatted;
            });
        });

        this.mapComponent.map.addInteraction(this.measuringTool);
        this.mapComponent.map.addInteraction(this.snap);
    }

    private getFeatures(): Collection<Feature> {
        let collection = new Collection([], {
            unique: true
        });

        this.mapComponent.map.getLayers().getArray().forEach((item: any) => {
            if ((item instanceof Vector) && !(item instanceof Heatmap))
                collection.getArray().push(...item.getSource().getFeatures())
        })

        return collection;
    }

    isPolygon() {
        return this.measureType == GeometryType.POLYGON;
    }

    toggle(): void {
        this.visibility = !this.visibility;

        if (this.visibility) {
            this.mapComponent.map.addLayer(this.vectorLayer);
            this.enableMeasuringTool();
        } else {
            this.mapComponent.map.removeLayer(this.vectorLayer);
            this.mapComponent.map.removeInteraction(this.measuringTool);
            this.mapComponent.map.removeInteraction(this.snap);
        }
    }

    select(value: any) {
        this.measureType = value === 'LineString'
            ? GeometryType.LINE_STRING
            : GeometryType.POLYGON;

        this.enableMeasuringTool();
    }
}
