import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectionLike } from 'ol/proj';

export abstract class BaseVectorSource {
    @Input() url: string;
    @Input() dataProjection: ProjectionLike;
    @Input() featureProjection: ProjectionLike;

    httpOptions: any;

    constructor(private http: HttpClient) {       
    }

    protected loader(layer: any) {
        return (extent: any, resolution: any, projection: any) => {

            layer.set("isLoading", true);
            layer.getSource().clear();

            let url = this.configureUrl(extent, resolution, projection);
            this.http.get(url, this.httpOptions).subscribe(
                (response: any) => {
                    layer.set("isLoading", false);
                    layer.getSource().addFeatures(
                        layer.getSource().getFormat().readFeatures(response, {
                            dataProjection: this.dataProjection,
                            featureProjection: this.featureProjection,
                        })
                    );
                },
                (error: any) => {
                    layer.set("isLoading", false);
                }
            );
        }
    }

    protected configureUrl(extent: any, resolution: any, projection: any){
        return this.url;
    }
}

export class XmlResponseAcceptedSource extends BaseVectorSource {
    httpOptions: any = {
        responseType: 'text'
    };
}

export class GeojsonResponseAcceptedSource extends BaseVectorSource {
    httpOptions: any = {
        responseType: 'json'
    };
}

export class EsrijsonResponseAcceptedSource extends BaseVectorSource {
    httpOptions: any = {
        responseType: 'json'
    };

    @Input() inSR: string;
    @Input() outSR: string;
    @Input() fields: string;

    configureUrl(extent: any, resolution: any, projection: any){
        let uri = this.url.concat('?f=json')
        .concat('&returnGeometry=true')
        .concat('&spatialRel=esriSpatialRelIntersects')
        .concat('&geometry=' + encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' + extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] + ',"spatialReference":{"wkid":' + (this.inSR || "3857") + '}}'))
        .concat('&geometryType=esriGeometryEnvelope')
        .concat('&inSR=' + (this.inSR || "3857"))
        .concat('&outSR=' + (this.outSR || "3857"))
        .concat('&outFields=' + (this.fields || "*"));

        return uri;
    }
}

export class WfsResponseAcceptedSource extends BaseVectorSource {
    httpOptions: any = {
        responseType: 'json'
    };

    @Input() geometryName: string;
    @Input() version: string;
    @Input() typename: string;

    configureUrl(extent: any, resolution: any, projection: any){
        let uri = this.url.concat('?service=WFS')
        .concat('&request=GetFeature')
        .concat('&outputFormat=application/json')
        .concat('&version=' + this.version)
        .concat('&typename=' + this.typename)
        .concat('&srsname=' + projection.getCode())
        .concat('&bbox=' + extent.join(',') + ',' + projection.getCode());

        return uri;
    }
}