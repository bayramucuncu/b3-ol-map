import { Component, OnInit, Input } from '@angular/core';
import { Vector } from 'ol/source';
import FeatureFormat from 'ol/format/Feature';
import { GeoJSON, TopoJSON, KML, GPX } from 'ol/format';
import GML2 from 'ol/format/GML2';
import GML3 from 'ol/format/GML2';
import GML32 from 'ol/format/GML2';
import { LoadingStrategy } from 'ol/source/Vector';
import { ProjectionLike } from 'ol/proj';
import { HttpClient } from '@angular/common/http';
import { VectorComponent } from '../../layers/vector/vector.component';

@Component({
  selector: 'b3-source-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit {
  source: Vector;

  @Input() overlaps: boolean;
  @Input() useSpatialIndex: boolean;
  @Input() wrapX: boolean;
  @Input() url: string;
  @Input() format: FeatureFormat;
  @Input() dataFormat: string;
  @Input() strategy: LoadingStrategy;
  @Input() dataProjection: ProjectionLike;
  @Input() featureProjection: ProjectionLike;

  constructor(private http: HttpClient, private layerComponent: VectorComponent) {
  }

  ngOnInit(): void {
      let dataFormats = {
          "geojson": new GeoJSON(),
          "topojson": new TopoJSON(),
          "kml": new KML(),
          "gpx": new GPX(),
          "gml2": new GML2(),
          "gml3": new GML3(),
          "gml32": new GML32()
      }

      let responseTypes = {
          "geojson": "json",
          "topojson": "json",
          "kml": "text",
          "gpx": "text",
          "gml2": "text",
          "gml3": "text",
          "gml32": "text"
      }

      let format = this.format
          ? this.format
          : this.dataFormat 
              ? dataFormats[this.dataFormat.toLowerCase()]
              : new GeoJSON();
      
      this.source = new Vector({
          overlaps: this.overlaps,
          useSpatialIndex: this.useSpatialIndex,
          wrapX: this.wrapX,
          url: this.url,
          format: format,
          strategy: this.strategy,
          loader: (extent, resolution, projection) => {
              this.layerComponent.layer.set("isLoading", true);
              this.source.clear();
              this.http.get(this.url,{ responseType: responseTypes[this.dataFormat.toLowerCase()] }).subscribe(
                  (response: any) => {
                      this.layerComponent.layer.set("isLoading", false);
                      this.source.addFeatures(format.readFeatures(response, {
                          dataProjection: this.dataProjection || projection,
                          featureProjection: this.featureProjection || projection
                      }));
                  },
                  (error: any) => {
                      this.layerComponent.layer.set("isLoading", false);
                  }
              );
          }       
      });

      this.layerComponent.layer.setSource(this.source);
  }
}
