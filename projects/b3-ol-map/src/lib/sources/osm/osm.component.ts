import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { OSM } from 'ol/source';
import { LoadFunction } from 'ol/Tile';
import { LayerTileComponent } from '../../layers/tile/tile.component';

@Component({
  selector: 'b3-source-osm',
  templateUrl: './osm.component.html',
  styleUrls: ['./osm.component.css']
})
export class OsmComponent implements AfterContentInit  {
  source: OSM;
  
  @Input() cacheSize: number;
  @Input() crossOrigin: string;
  @Input() maxZoom: number;
  @Input() opaque: boolean;
  @Input() reprojectionErrorThreshold: number;
  @Input() tileLoadFunction: LoadFunction;
  @Input() url: string;
  @Input() wrapX: boolean;
  
  constructor(private layerComponent: LayerTileComponent) {
  }

  ngAfterContentInit(): void {
      
      this.source = new OSM({
          cacheSize: this.cacheSize,
          crossOrigin: this.crossOrigin,
          maxZoom: this.maxZoom,
          opaque: this.opaque,
          reprojectionErrorThreshold: this.reprojectionErrorThreshold,
          tileLoadFunction: this.tileLoadFunction,
          url: this.url,
          wrapX: this.wrapX
      });
      
      this.source.on("tileloadstart", ()=> this.layerComponent.layer.set("isLoading", true));
      this.source.on("tileloadend", ()=> this.layerComponent.layer.set("isLoading", false));
      this.source.on("tileloaderror", ()=> this.layerComponent.layer.set("isLoading", false));

      this.layerComponent.layer.setSource(this.source);
  }
}
