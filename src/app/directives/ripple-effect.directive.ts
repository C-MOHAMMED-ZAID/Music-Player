import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRippleEffect]',
  standalone: true
})
export class RippleEffectDirective {
  @Input() rippleColor: string = 'rgba(255, 255, 255, 0.7)';
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const button = this.el.nativeElement;
    const circle = this.renderer.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const circleStyle = {
      width: `${diameter}px`,
      height: `${diameter}px`,
      left: `${event.clientX - button.getBoundingClientRect().left - radius}px`,
      top: `${event.clientY - button.getBoundingClientRect().top - radius}px`,
      backgroundColor: this.rippleColor,
      borderRadius: '50%',
      position: 'absolute',
      transform: 'scale(0)',
      animation: 'ripple 600ms linear'
    };
    
    Object.assign(circle.style, circleStyle);
    
    this.renderer.appendChild(button, circle);
    
    setTimeout(() => {
      this.renderer.removeChild(button, circle);
    }, 600);
  }
}