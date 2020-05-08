import { Component, OnInit, Input, ViewEncapsulation, ɵConsole } from '@angular/core';
import { Subject, Observable, from, of, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, delay, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import VectorLayer from 'ol/layer/Vector';
import { Feature } from 'ol';
import VectorSource from 'ol/source/Vector';
import { MapComponent } from '../../b3-ol-map.component';
import { Style, Fill, Stroke } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import GeoJSON from 'ol/format/GeoJSON';

@Component({
  selector: 'b3-control-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  @Input() placeholder: string;
  @Input() url: string = "https://gisservices.isu.gov.tr/arcgis/rest/services/Altyapilar/Poi/MapServer/0/query";
  @Input() dataProjection: string;

  result$: Observable<any[]>;

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private positionFeature: Feature = new Feature();
  private vectorLayer: VectorLayer;
  private searchSubject: Subject<string> = new Subject<string>();
  

  private tempData:any[] = [{ name: "DRNV100", x: 29.929944, y: 40.768005 }, { name: "DRNV100", x: 29.829944, y: 40.768005 }, { name: "IZMV145", x: 29.907457, y: 40.771125 }];
  private tempReulsts:any[] = [];

  constructor(private httpClient: HttpClient, private mapComponent: MapComponent) { 
    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [this.positionFeature]
      })
    });
    this.positionFeature.setStyle(new Style({
      image: new CircleStyle({
        radius: 8,
        fill: new Fill({
          color: '#ed2f47'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        })
      })
    }))
    this.vectorLayer.set("name", "Search Results");
    this.mapComponent.map.addLayer(this.vectorLayer);
  }

  ngOnInit() {
    !this.placeholder && (this.placeholder = "Search");
    !this.dataProjection && (this.dataProjection = "EPSG:4326");

    this.result$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),    
      tap(()=> this.isLoading.next(true)),  
      switchMap((searchTerm:string) => this.sendHttpRequest(searchTerm))
      //switchMap((searchTerm: string) => of(this.tempReulsts).pipe(delay(3000), tap(()=>this.isLoading.next(false))))
    );
  }

  private sendHttpRequest(searchTerm: string): Observable<any[]> {
    const options = { params: new HttpParams()
      .set('where', `poi_id='${searchTerm}'`) 
      .set('f', 'geojson')
      .set('outsr', this.mapComponent.map.getView().getProjection().getCode().split(':')[1])
    };

    return this.httpClient.get<any[]>(`${this.url}`, options).pipe(tap(()=>this.isLoading.next(false)));
  }
  
  search(searchTerm: string) {
    this.tempReulsts = this.tempData.filter(e => e.name.toLowerCase() == searchTerm.toLowerCase());

    this.searchSubject.next(searchTerm);
  }

  zoom(item: any) {
    let format = new GeoJSON();
    let position = format.readFeature(item);
    //let position = transform([item.x, item.y], this.dataProjection, this.mapComponent.map.getView().getProjection())
console.log(position)
    this.mapComponent.map.getView().setCenter(position.getGeometry().getExtent());

    this.positionFeature.setGeometry(
      position.getGeometry()
    );
  }

}
