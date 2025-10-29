import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragDrop]',
  standalone: true
})
export class DragDropDirective {
  @Output() fileDropped = new EventEmitter<FileList>();
  
  constructor(private el: ElementRef) {}
  
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.el.nativeElement.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
  }
  
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.el.nativeElement.style.backgroundColor = '';
  }
  
  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.el.nativeElement.style.backgroundColor = '';
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}