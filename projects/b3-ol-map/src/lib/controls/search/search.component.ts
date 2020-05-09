import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Subject, Observable, BehaviorSubject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Feature} from 'ol';
import { Style, Fill, Stroke } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle';
import GeoJSON from 'ol/format/GeoJSON';
import { MapComponent } from '../../b3-ol-map.component';

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
  isHidden: boolean = false;

  private positionFeature: Feature = new Feature();
  private searchSubject: Subject<string> = new Subject<string>();
  private vectorLayer: VectorLayer;

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
      tap(() => this.isLoading.next(true)),
      switchMap((searchTerm: string) => this.sendHttpRequest(searchTerm))
    );
  }

  private sendHttpRequest(searchTerm: string): Observable<any[]> {

    if (searchTerm === '')
      return of([]).pipe(tap(() => this.isLoading.next(false)));

    const options = {
      params: new HttpParams()
        .set('where', `lower(poi_id) like '${searchTerm.toLocaleLowerCase()}%' or lower(poi_adi) like '%${searchTerm.toLocaleLowerCase()}%'`)
        .set('outsr', this.mapComponent.map.getView().getProjection().getCode().split(':')[1])
        .set('outFields', '*')
        .set('f', 'geojson')
    };

    return this.httpClient.get<any[]>(`${this.url}`, options).pipe(tap(() => this.isLoading.next(false)));
  }

  search(searchTerm: string) {
    this.isHidden = false;
    this.searchSubject.next(searchTerm);
  }

  toggle(){
    this.isHidden = !this.isHidden;
  }

  zoom(item: any) {

    let feature = new GeoJSON().readFeature(item);

    this.mapComponent.map.getView().setCenter(feature.getGeometry().getExtent());

    this.positionFeature.setGeometry(feature.getGeometry());

    this.positionFeature.setProperties(feature.getProperties());
  }
}
