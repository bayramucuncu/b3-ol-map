import { Component, OnInit, Input } from '@angular/core';
import { TileArcGISRest } from 'ol/source';
import { ProjectionLike } from 'ol/proj';
import { LayerTileComponent } from '../../layers/tile/tile.component';

@Component({
  selector: 'b3-source-tile-arcgisrest',
  templateUrl: './tile-arcgis-rest.component.html',
  styleUrls: ['./tile-arcgis-rest.component.css']
})
export class TileArcgisRestComponent implements OnInit {
  source: TileArcGISRest;

  @Input() cacheSize: number;
  @Input() crossOrigin: null | string;
  @Input() url: string;
  @Input() urls: string[];
  @Input() transition: number;
  @Input() reprojectionErrorThreshold: number;
  @Input() params: object;
  @Input() projection: ProjectionLike;
  @Input() wrapX: boolean;
  
  constructor(private layerComponent: LayerTileComponent) {
  }

  ngOnInit(): void {
     
      this.source = new TileArcGISRest({
          cacheSize: this.cacheSize,
          url: this.url,
          urls: this.urls,
          transition: this.transition,
          params: this.params,
          projection: this.projection,
          reprojectionErrorThreshold: this.reprojectionErrorThreshold,
          wrapX: this.wrapX
      });

      this.source.on("tileloadstart", ()=> this.layerComponent.layer.set("isLoading", true));
      this.source.on("tileloadend", ()=> this.layerComponent.layer.set("isLoading", false));
      this.source.on("tileloaderror", ()=> this.layerComponent.layer.set("isLoading", false));
  
      this.layerComponent.layer.setSource(this.source);
  }
}