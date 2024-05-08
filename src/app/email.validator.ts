import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appCitEmailValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CitEmailValidatorDirective, multi: true }]
})
export class CitEmailValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (!control.value || control.value.endsWith('@cit.just.edu.jo')) {
      return null; // Valid email
    }
    return { 'invalidEmail': true }; // Invalid email
  }
}
