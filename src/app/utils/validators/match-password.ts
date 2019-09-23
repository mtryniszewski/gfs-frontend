import { AbstractControl } from '@angular/forms';

export function matchPassword(
  abstractControl: AbstractControl,
  passwordControlName: string,
  repeatPasswordControlName: string
) {
  const password = abstractControl.get(passwordControlName).value;
  const confirmPassword = abstractControl.get(repeatPasswordControlName).value;
  if (password !== confirmPassword) {
    abstractControl.get(repeatPasswordControlName).setErrors({ matchPassword: true });
  } else {
    return null;
  }
}
