import { Directive, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { DraggableType } from './draggable.directive';

@Directive({
  selector: '[b3DraggableDropZone]'
})
export class DraggableDropZoneDirective {
  dragEnterCount = 0;

  @Input() dropAcceptType: DraggableType;
  @Output() outDropDraggable = new EventEmitter<any>();
  @HostBinding('class.over') over = false;

  private typeIsAccepted(event: DragEvent) {
      const draggableType = Array.from(event.dataTransfer.types).find(
          (key) => key.indexOf('draggable-type') === 0
      );

      return draggableType && draggableType.split(':')[1] === this.dropAcceptType;
  }

  @HostListener('dragenter', ['$event'])
  dragEnter(event: DragEvent) {
      if (this.typeIsAccepted(event)) {
          this.over = true;
          this.dragEnterCount++;
      }
  }

  @HostListener('dragleave', ['$event'])
  dragLeave(event: DragEvent) {
      if (this.typeIsAccepted(event) && --this.dragEnterCount === 0) {
          this.over = false;
      }
  }

  @HostListener('dragover', ['$event'])
  dragOver(event: DragEvent) {
      if (this.typeIsAccepted(event)) {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
      }
  }

  @HostListener('drop', ['$event'])
  drop(event: DragEvent) {
      if (this.typeIsAccepted(event)) {
          const data = event.dataTransfer.getData('drag-data');
          this.over = false;
          this.dragEnterCount = 0;
          this.outDropDraggable.next(JSON.parse(data));
      }
  }
}