import { RemoveNonPrintableCharsPipe } from './remove-non-printable-chars.pipe';

describe('RemoveNonPrintableCharsPipe', () => {
  it('create an instance', () => {
    const pipe = new RemoveNonPrintableCharsPipe();
    expect(pipe).toBeTruthy();
  });
});
