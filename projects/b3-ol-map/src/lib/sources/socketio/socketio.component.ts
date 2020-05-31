import { Component, OnInit, Input } from '@angular/core';
import { Vector } from 'ol/source';
import { ProjectionLike } from 'ol/proj';
import { VectorComponent } from '../../layers/vector/vector.component';
import { connect } from 'socket.io-client';
import { GeoJSON } from 'ol/format';
import { MapComponent } from '../../b3-ol-map.component';

@Component({
  selector: 'b3-source-socketio',
  templateUrl: './socketio.component.html',
  styleUrls: ['./socketio.component.css']
})
export class SocketioComponent implements OnInit {

  source: Vector;

  private socket: SocketIOClient.Socket;

  @Input() url: string;
  @Input() removeInterval: number;
  @Input() emitName: string;
  @Input() dataProjection: ProjectionLike;
  @Input() featureProjection: ProjectionLike;

  constructor(private layerComponent: VectorComponent, private mapComponent: MapComponent) {

  }

  ngOnInit() {
    this.socket = connect(this.url);
    this.source = new Vector();
    this.emitName = this.emitName || "feature";

    const projection = this.mapComponent.map.getView().getProjection();

    this.socket.on(this.emitName, (data: any) => {

      const features = new GeoJSON().readFeatures(data, {
        dataProjection: this.dataProjection || projection,
        featureProjection: this.featureProjection || projection
      });

      this.source.addFeatures(features);
      
      if (this.removeInterval) {
        setTimeout(() => {
          console.log(this.removeInterval)
            features.forEach(feature => {
              this.source.removeFeature(feature);
            });
           }, this.removeInterval)
      }

    });


    this.layerComponent.layer.setSource(this.source);
  }

}
