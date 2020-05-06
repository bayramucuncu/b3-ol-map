import { Component, OnInit, Input, Optional } from '@angular/core';
import { Vector } from 'ol/source';
import { HttpClient } from '@angular/common/http';
import { XmlResponseAcceptedSource } from '../base-vector-source';
import { VectorComponent } from '../../layers/vector/vector.component';
import { HeatmapComponent } from '../../layers/heatmap/heatmap.component';
import { KML } from 'ol/format';

@Component({
  selector: 'b3-source-kml',
  templateUrl: './kml.component.html',
  styleUrls: ['./kml.component.css']
})
export class KmlComponent extends XmlResponseAcceptedSource implements OnInit {
  source: Vector;

  @Input() extractStyles: boolean;
  @Input() showPointNames: boolean;
  @Input() writeStyles: boolean;

  constructor(http: HttpClient, @Optional() private layerComponent?: VectorComponent, @Optional() private heatmapLayerComponent?: HeatmapComponent) {
      super(http);
  }

  ngOnInit(): void {

      let layer = this.layerComponent
          ? this.layerComponent.layer
          : this.heatmapLayerComponent.layer;

      let format = new KML({
          extractStyles: this.extractStyles,
          showPointNames: this.showPointNames,
          writeStyles: this.writeStyles
      });

      this.source = new Vector({
          url: this.url,
          format: format,
          loader: this.loader(layer)
      })
      
      layer.setSource(this.source);

      if (this.heatmapLayerComponent) {
          this.source.on('addfeature', function (event) {
              var name = event.feature.get('name');
              var magnitude = parseFloat(name.substr(2));
              event.feature.set('weight', magnitude);
              event.feature.set('type', "OTHER");
              event.feature.setStyle(undefined);
          });
      }
  }
}
