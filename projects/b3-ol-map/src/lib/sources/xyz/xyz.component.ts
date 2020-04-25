import { Component, OnInit, Input } from '@angular/core';
import { XYZ } from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid';
import { LoadFunction } from 'ol/Tile';
import { LayerTileComponent } from '../../layers/tile/tile.component';

@Component({
  selector: 'b3-source-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.css']
})
export class XyzComponent implements OnInit {
  source: XYZ;

  @Input() cacheSize: number;
  @Input() crossOrigin: string;
  @Input() opaque: boolean;
  @Input() attributionsCollapsible: boolean;
  @Input() projection: string;
  @Input() reprojectionErrorThreshold: number;
  @Input() maxZoom: number;
  @Input() minZoom: number;
  @Input() tileGrid: TileGrid;
  @Input() tileLoadFunction?: LoadFunction;
  @Input() tilePixelRatio: number;
  @Input() tileSize: number;
  @Input() url: string;
  @Input() urls: string[];
  @Input() wrapX: boolean;
  @Input() transition: number;

  constructor(private layerComponent: LayerTileComponent) { }

  ngOnInit() {
      this.source = new XYZ({
          cacheSize: this.cacheSize,
          crossOrigin: this.crossOrigin,
          opaque: this.opaque,
          attributionsCollapsible: this.attributionsCollapsible,
          projection: this.projection,
          reprojectionErrorThreshold: this.reprojectionErrorThreshold,
          maxZoom: this.maxZoom,
          minZoom: this.minZoom,
          tileGrid: this.tileGrid,
          tileLoadFunction: this.tileLoadFunction,
          tilePixelRatio: this.tilePixelRatio,
          tileSize: this.tileSize,
          url: this.url,
          urls: this.urls,
          wrapX: this.wrapX,
          transition: this.transition,
          tileUrlFunction: (tileCoord) => {
              return this.url
                  .replace('{z}', (tileCoord[0]).toString())
                  .replace('{x}', (tileCoord[1]).toString())
                  .replace('{y}', (tileCoord[2]).toString());
          }        
      });

      this.source.on("tileloadstart", ()=> this.layerComponent.layer.set("isLoading", true));
      this.source.on("tileloadend", ()=> this.layerComponent.layer.set("isLoading", false));
      this.source.on("tileloaderror", ()=> this.layerComponent.layer.set("isLoading", false));

      this.layerComponent.layer.setSource(this.source);
  }
}