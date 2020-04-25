import { Component, OnInit, Input } from '@angular/core';
import { BingMaps } from 'ol/source';
import { LoadFunction } from 'ol/Tile';
import { LayerTileComponent } from '../../layers/tile/tile.component';

@Component({
  selector: 'b3-source-bingmaps',
  templateUrl: './bingmaps.component.html',
  styleUrls: ['./bingmaps.component.css']
})
export class BingmapsComponent implements OnInit {
  source: BingMaps;
 
  @Input() cacheSize: number;
  @Input() hidpi: boolean;
  @Input() culture: string;
  @Input() key: string;
  @Input() imagerySet: 'Road'|'Aerial'|'AerialWithLabels'|'collinsBart'|'ordnanceSurvey' = 'Aerial';
  @Input() maxZoom: number;
  @Input() reprojectionErrorThreshold: number;
  @Input() tileLoadFunction?: LoadFunction;
  @Input() wrapX: boolean;
 
  constructor(private layerComponent: LayerTileComponent) {}
  
  ngOnInit() {
    this.source = new BingMaps({
        cacheSize: this.cacheSize,
        hidpi: this.hidpi,
        culture: this.culture,
        key:this.key,
        imagerySet: this.imagerySet,
        maxZoom: this.maxZoom,
        reprojectionErrorThreshold: this.reprojectionErrorThreshold,
        tileLoadFunction: this.tileLoadFunction,
        wrapX: this.wrapX
    });
console.log(this.source)
    this.source.on("tileloadstart", ()=> this.layerComponent.layer.set("isLoading", true));
    this.source.on("tileloadend", ()=> this.layerComponent.layer.set("isLoading", false));
    this.source.on("tileloaderror", ()=> this.layerComponent.layer.set("isLoading", false));

    this.layerComponent.layer.setSource(this.source);

  }
}