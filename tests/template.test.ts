import { VTemplateRow } from '../src/types';
import { Template } from '../src/vuito';

describe('template constructor', () => {
  const demo = new Template({
    one: [{ test: () => true, message: 'Never shown' }],
    two: [{ test: () => false, message: 'Always shown' }],
  });

  test('first level check', () => {
    expect(demo.check).toBeTruthy();
  });

  test('second level checks', () => {
    expect((<VTemplateRow>demo.one).check).toBeTruthy();
    expect((<VTemplateRow>demo.two).check).toBeTruthy();
  });
});

describe('template methods', () => {
  const demo = new Template({
    one: [{ test: () => true, message: 'Never shown' }],
    two: [{ test: () => false, message: 'Always shown', onlyIf: (p) => !!p.one }],
  });

  test('first level check', async () => {
    await expect(demo.check({ one: 'yes' })).rejects.toBe('Always shown');
    await expect(demo.check({})).resolves.toBeUndefined();
  });

  test('second level checks', async () => {
    await expect((<VTemplateRow>demo.one).check('any')).resolves.toBeUndefined();
    await expect((<VTemplateRow>demo.two).check('any')).rejects.toBe('Always shown');
    await expect((<VTemplateRow>demo.two).check('any', {})).resolves.toBeUndefined();
  });
});
