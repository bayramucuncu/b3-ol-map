import { Component, OnInit, Input } from '@angular/core';
import { ImageStatic } from 'ol/source';
import { ImageComponent } from '../../layers/image/image.component';
import { LoadFunction } from 'ol/Image';
import { Extent } from 'ol/extent';
import { Size } from 'ol/size';

@Component({
  selector: 'b3-source-image-static',
  templateUrl: './image-static.component.html',
  styleUrls: ['./image-static.component.css']
})
export class ImageStaticComponent implements OnInit {
  source: ImageStatic;
 
  @Input() attributions: string;
  @Input() crossOrigin: string;
  @Input() imageExtent: Extent;
  @Input() imageLoadFunction?: LoadFunction;
  @Input() projection: string;
  @Input() imageSize?: Size;
  @Input() url: string;

  constructor(private layerComponent: ImageComponent) {}
  
  ngOnInit() {
    this.source = new ImageStatic({
        attributions: this.attributions,
        crossOrigin: this.crossOrigin,
        imageExtent: this.imageExtent,
        imageLoadFunction: this.imageLoadFunction,
        projection: this.projection,
        imageSize: this.imageSize,
        url: this.url
    });

    this.source.on("imageloadstart", ()=>  this.layerComponent.layer.set("isLoading", true));
    this.source.on("imageloadend", ()=> this.layerComponent.layer.set("isLoading", false));
    this.source.on("imageloadend", ()=> this.layerComponent.layer.set("isLoading", false));

    this.layerComponent.layer.setSource(this.source);
  }
}