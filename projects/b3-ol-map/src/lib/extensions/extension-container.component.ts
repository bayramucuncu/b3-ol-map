import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'b3-extension-container',
  templateUrl: './extension-container.component.html',
  styleUrls: ['./extension-container.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExtensionContainerComponent implements OnInit {

  @Input() extensions: any[];

  rightMenuItems: any[];
  freeItems: any[];

  constructor() { }

  ngOnInit() {
    !this.extensions && (this.extensions = []);

    this.rightMenuItems = this.extensions.filter((f: any) => f.settings.container === "rightMenu")
    this.freeItems = this.extensions.filter((f: any) => f.settings.container === "none")
  }
}
