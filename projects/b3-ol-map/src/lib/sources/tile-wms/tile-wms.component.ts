import { Component, OnInit, Input } from '@angular/core';
import { TileWMS } from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid';
import { LoadFunction } from 'ol/Tile';
import { LayerTileComponent } from '../../layers/tile/tile.component';

@Component({
  selector: 'b3-source-tile-wms',
  templateUrl: './tile-wms.component.html',
  styleUrls: ['./tile-wms.component.css']
})
export class TileWmsComponent implements OnInit {
  source: TileWMS;

  @Input() cacheSize: number;
  @Input() crossOrigin: string;
  @Input() gutter: number;
  @Input() hidpi: boolean;
  @Input() params: Object;
  @Input() projection: string;
  @Input() reprojectionErrorThreshold: number;
  @Input() serverType: string;
  @Input() tileGrid: TileGrid;
  @Input() tileLoadFunction?: LoadFunction;
  @Input() url: string;
  @Input() urls: string[];
  @Input() wrapX: boolean;
 
  constructor(private layerComponent: LayerTileComponent) {}
  
  ngOnInit() {
    this.source = new TileWMS({
        cacheSize: this.cacheSize,
        crossOrigin: this.crossOrigin,
        gutter: this.gutter,
        hidpi: this.hidpi,
        params: this.params,
        projection: this.projection,
        reprojectionErrorThreshold: this.reprojectionErrorThreshold,
        serverType: this.serverType,
        tileGrid: this.tileGrid,
        tileLoadFunction: this.tileLoadFunction,
        url: this.url,
        urls: this.urls,
        wrapX: this.wrapX
    });
    
    this.source.on("tileloadstart", ()=> this.layerComponent.layer.set("isLoading", true));
    this.source.on("tileloadend", ()=> this.layerComponent.layer.set("isLoading", false));
    this.source.on("tileloaderror", ()=> this.layerComponent.layer.set("isLoading", false));

    this.layerComponent.layer.setSource(this.source);
  }
}
