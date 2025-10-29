import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'waveform',
  standalone: true
})
export class WaveformPipe implements PipeTransform {
  transform(audioData: number[] | null, width: number = 200): string {
    if (!audioData || audioData.length === 0) {
      // Return a flat line if no data
      return `M 0,50 L ${width},50`;
    }
    
    const points = audioData.map((value, index) => {
      const x = (index / (audioData.length - 1)) * width;
      const y = 50 + (value * 40); // Scale the waveform
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  }
}