import { Component, OnInit, Input } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from "@aspnet/signalr";
import { Vector } from 'ol/source';
import { ProjectionLike } from 'ol/proj';
import { VectorComponent } from '../../layers/vector/vector.component';
import { GeoJSON } from 'ol/format';

@Component({
  selector: 'b3-source-signalr',
  templateUrl: './signalr.component.html',
  styleUrls: ['./signalr.component.css']
})
export class SignalrComponent implements OnInit {

  source: Vector;
  isConnected: boolean = false;

  @Input() url: string;
  @Input() reconnectInterval: number;
  @Input() removeInterval: number;
  @Input() dataProjection: ProjectionLike;
  @Input() featureProjection: ProjectionLike;

  constructor(private layerComponent: VectorComponent) {
  }

  ngOnInit(): void {

      this.source = new Vector();

      let hubConnection = new HubConnectionBuilder()
          .withUrl(this.url)
          .build();

      hubConnection.on("ReceiveGeojson", (e) => {
          let feature = new GeoJSON().readFeature(JSON.parse(e), {
              dataProjection: this.dataProjection,
              featureProjection: this.featureProjection
          });

          this.source.addFeature(feature);

          if(this.removeInterval){
              setTimeout(() => {
                  this.source.removeFeature(feature);
              }, this.removeInterval);
          }
      });

      this.startHubConnection(hubConnection);

      setInterval(() => {
          if (hubConnection.state === 0) {
             console.log("Connection is retrying...");
             this.startHubConnection(hubConnection);
          }
      }, (this.reconnectInterval | 5000));

      this.layerComponent.layer.setSource(this.source);
  }

  private startHubConnection(hubConnection: HubConnection) {
      hubConnection.start()
          .then(() => {
              this.isConnected = true;
              console.log("Connection started.");
          })
          .catch((error) => {
              this.isConnected = false;
              console.log("Error while starting connection: " + error)
          });
  }
}
