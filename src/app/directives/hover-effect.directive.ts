import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverEffect]',
  standalone: true
})
export class HoverEffectDirective {
  @Input() hoverScale: number = 1.05;
  @Input() hoverShadow: string = '0 10px 30px rgba(0,0,0,0.3)';
  
  constructor(private el: ElementRef) {}
  
  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.transform = `scale(${this.hoverScale})`;
    this.el.nativeElement.style.boxShadow = this.hoverShadow;
    this.el.nativeElement.style.transition = 'all 0.3s ease';
  }
  
  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.transform = 'scale(1)';
    this.el.nativeElement.style.boxShadow = 'none';
  }
}