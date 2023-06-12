import { PasswordStrengthErrorsKeysPipe } from './password-strength-errors-keys.pipe';

describe('PasswordStrengthErrorsKeysPipe', () => {
  it('create an instance', () => {
    const pipe = new PasswordStrengthErrorsKeysPipe();
    expect(pipe).toBeTruthy();
  });
});
