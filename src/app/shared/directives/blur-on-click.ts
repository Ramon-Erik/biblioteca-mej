import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appBlurOnClick]',
})
export class BlurOnClick {
  private el = inject(ElementRef);

  @HostListener('click')
  onClick() {
    this.el.nativeElement.blur();
  }
}
