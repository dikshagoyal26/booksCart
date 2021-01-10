import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[togglePasswordDisplay]',
})
export class PasswordDirective {
  private _shown = false;
  constructor(private el: ElementRef) {
    this.setup();
  }
  setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('i');
    span.className = 'fa pointer fa-eye-slash';
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }
  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      span.className = 'fa pointer fa-eye';
      this.el.nativeElement.setAttribute('type', 'text');
    } else {
      span.className = 'fa pointer fa-eye-slash';
      this.el.nativeElement.setAttribute('type', 'password');
    }
  }
}
