import { Component, OnInit, Input } from '@angular/core';
import { register } from "ol/proj/proj4"
import * as proj4 from 'proj4';

@Component({
  selector: 'b3-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.css']
})
export class ProjectionComponent implements OnInit {
  @Input() code: string;
  @Input() proj4: string;

  ngOnInit(): void {
    if (this.code && this.proj4) {
      let projection = (proj4 as any).default;

      projection.defs(this.code, this.proj4);

      register(projection);
    }
  }
}
