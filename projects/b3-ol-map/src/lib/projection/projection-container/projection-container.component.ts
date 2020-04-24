import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'b3-projection-container',
  templateUrl: './projection-container.component.html',
  styleUrls: ['./projection-container.component.css']
})
export class ProjectionContainerComponent implements OnInit {

  @Input() projections: any[];
  
  constructor() { }

  ngOnInit() {
    !this.projections && (this.projections = this.getDefaultProjections());
  }
  
  private getDefaultProjections(): any[] {
    return []
  }

}
