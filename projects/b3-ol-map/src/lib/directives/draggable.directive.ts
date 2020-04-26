import { Directive, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';

export type DraggableType = 'layer';

@Directive({
    selector: '[b3Draggable]'
})
export class DraggableDirective {
    @HostBinding('draggable') draggable = 'true';
    @Input() draggableData: any;
    @Input() draggableType: DraggableType;
    @HostBinding('class.dragging') dragging = false;
    @HostListener('dragstart', ['$event']) dragStart(event: DragEvent) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('label', this.draggableData);
        event.dataTransfer.setData(`draggable-type:${this.draggableType}`, '');

        this.dragging = true;
    }
    @HostListener('dragend')
    onDragEnd() {
        this.dragging = false;
    }
}