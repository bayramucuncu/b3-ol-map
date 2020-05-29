import { Component, OnInit } from '@angular/core';
import { Select } from 'ol/interaction';
import Feature from 'ol/Feature';

@Component({
  selector: 'b3-feature-info-widget',
  templateUrl: './feature-info-widget.component.html',
  styleUrls: ['./feature-info-widget.component.css']
})
export class FeatureInfoWidgetComponent implements OnInit {

  selectInteraction: Select;
  properties: any[] = [];

  constructor() {
  }

  ngOnInit(): void {

      this.selectInteraction.on("select", (e) => {
          e.selected.forEach((feature: Feature) => {
              this.properties = [];

              feature.getKeys().forEach((element: any) => {
                  if (element !== "geometry") {
                      this.properties.push({ key: element, value: feature.get(element) });
                  }
              })
          })

      });
  }
}