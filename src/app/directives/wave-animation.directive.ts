import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appWaveAnimation]',
  standalone: true
})
export class WaveAnimationDirective implements OnInit, OnDestroy {
  @Input() isPlaying: boolean = false;
  @Input() frequency: number = 2;
  
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationId?: number;
  
  constructor(private el: ElementRef) {}
  
  ngOnInit() {
    this.createCanvas();
    if (this.isPlaying) {
      this.startAnimation();
    }
  }
  
  ngOnDestroy() {
    this.stopAnimation();
  }
  
  private createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.el.nativeElement.offsetWidth;
    this.canvas.height = 60;
    this.canvas.style.position = 'absolute';
    this.canvas.style.bottom = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    
    this.el.nativeElement.style.position = 'relative';
    this.el.nativeElement.appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d')!;
  }
  
  private startAnimation() {
    let time = 0;
    
    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.canvas.height / 2);
      
      for (let x = 0; x < this.canvas.width; x++) {
        const y = Math.sin(x * 0.05 + time) * 20 * Math.sin(time * this.frequency);
        this.ctx.lineTo(x, this.canvas.height / 2 + y);
      }
      
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      
      time += 0.1;
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  private stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}