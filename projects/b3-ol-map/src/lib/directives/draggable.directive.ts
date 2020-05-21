import { Directive, HostBinding, HostListener, Input } from '@angular/core';

export type DraggableType = 'layer';

@Directive({
    selector: '[b3Draggable]'
})
export class DraggableDirective {
    @Input() draggableData: any;
    @Input() draggableType: DraggableType;

    @HostBinding('draggable') draggable = 'true';
    @HostBinding('class.dragging') dragging = false;
        
    @HostListener('dragend') 
    onDragEnd() {
        this.dragging = false;
    }

    @HostListener('dragstart', ['$event']) 
    dragStart(event: DragEvent) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('label', this.draggableData);
        event.dataTransfer.setData(`draggable-type:${this.draggableType}`, '');

        this.dragging = true;
    }
}