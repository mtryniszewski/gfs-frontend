import { Directive, ElementRef, HostListener, Renderer2, OnInit, Input, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appBootstrapErrors]'
})
export class BootstrapErrorsDirective implements OnInit, OnDestroy {
  @Input() errorKeyParent: string;
  private errorsEl;
  private errorText;
  private errorShowed = false;

  private defaultErrorText = '&nbsp;';

  private valueChange$: Subscription;

  constructor(private el: ElementRef,
    private control: NgControl,
    private renderer: Renderer2,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.errorsEl = this.renderer.createElement('div');
    this.renderer.addClass(this.errorsEl, 'invalid-feedback');
    this.renderer.setStyle(this.errorsEl, 'display', 'block');
    const parent = this.renderer.parentNode(this.el.nativeElement);
    this.renderer.appendChild(parent, this.errorsEl);

    this.renderer.setProperty(this.errorsEl, 'innerHTML', this.defaultErrorText);

    this.onEvent();

    this.valueChange$ = this.control.valueChanges.subscribe(() => {
      if (!this.control.dirty) {
        this.onEvent();
      }
    });
  }
  // @HostListener('input', ['$event']) onInput($event) {
  //   this.onEvent($event);
  // }

  ngOnDestroy(): void {
    this.valueChange$.unsubscribe();
  }

  @HostListener('focusout', ['$event']) onFocusout($event) {
    this.onEvent($event);
  }

  private onEvent($event?) {
    if (this.isNotValid()) {
      if (this.showErrors()) {
        this.renderer.addClass(this.el.nativeElement, 'is-invalid');
        this.renderer.setProperty(this.errorsEl, 'innerHTML', this.defaultErrorText);
        this.getErrorText(this.getErrorsKey()[0]).subscribe((translation) => {
          this.errorText = this.renderer.createText(translation);
          this.renderer.appendChild(this.errorsEl, this.errorText);
          this.errorShowed = true;
        });
      }
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
      if (this.errorShowed) {
        this.renderer.removeChild(this.errorsEl, this.errorText);
        this.errorShowed = false;
      }
      this.renderer.setProperty(this.errorsEl, 'innerHTML', this.defaultErrorText);
    }
  }

  private getErrorText(name: string): Observable<string> {
    const errorI18nKey = `${this.errorKeyParent ? this.errorKeyParent : 'validationError'}.${name}`;

    return this.translateService.get(errorI18nKey);
  }

  private isNotValid(): boolean {
    return this.control.invalid;
  }

  private showErrors(): boolean {
    return (this.control.dirty || this.control.touched) && this.isNotValid();
  }

  private getErrorsKey(): string[] {
    const controlErrors = _.pickBy(this.control.errors, error => error);
    return _.map(controlErrors, (value, key) => {
      if (_.isString(value)) {
        return value;
      } else if (value === true || _.isObject(value)) {
        return key;
      }
    });
  }

}
