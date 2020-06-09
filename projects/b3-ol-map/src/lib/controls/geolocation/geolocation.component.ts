import { Component, OnInit, ViewEncapsulation, NgZone, OnDestroy } from '@angular/core';
import { MapComponent } from '../../b3-ol-map.component';
import { Geolocation, Feature } from 'ol';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Point } from 'ol/geom';
import { Style, Fill, Stroke } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

@Component({
  selector: 'b3-control-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GeolocationComponent implements OnInit, OnDestroy {

  private geolocation: Geolocation;
  private positionFeature: Feature = new Feature();
  private vectorLayer: VectorLayer;

  isTracing: boolean = false;

  constructor(private mapComponent: MapComponent, private ngZone: NgZone) {
    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [this.positionFeature]
      })
    });

    this.positionFeature.setStyle(new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: '#F55533'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        })
      })
    }))

    this.vectorLayer.set("name", "Geolocation Position");
    this.vectorLayer.set("order", 100000000);
  }
  

  ngOnInit() {
    this.geolocation = new Geolocation({
      projection: this.mapComponent.map.getView().getProjection(),
      tracking: this.isTracing,
      trackingOptions: {
        enableHighAccuracy: true
      }
    });

    this.geolocation.on("change", this.ngZone.run(() => this.onChange()));
    this.geolocation.on("error", this.ngZone.run(() => this.onError()));
  }

  ngOnDestroy(): void {
    this.geolocation.un("change", this.ngZone.run(() => this.onChange()));
    this.geolocation.un("error", this.ngZone.run(() => this.onError()));
  }

  private onError() {
    return (evt: any) => {
      console.error(evt);
    }
  }

  private onChange() {
    return () => {
      let position = this.geolocation.getPosition();
      this.positionFeature.setGeometry(new Point(position));
      
      if(this.mapComponent && this.mapComponent.map)
        this.mapComponent.map.getView().setCenter(position);
    }
  }

  toggleTrace() {
    this.isTracing = !this.isTracing;

    this.geolocation.setTracking(this.isTracing);

    this.isTracing ? this.mapComponent.map.addLayer(this.vectorLayer) : this.mapComponent.map.removeLayer(this.vectorLayer);
  }
}
