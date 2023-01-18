import { templateify } from '../src/vuito';

describe('template constructor', () => {
  const demo = templateify({
    one: [{ test: () => true, message: 'Never shown' }],
    two: [{ test: () => false, message: 'Always shown' }],
  });

  test('first level check', () => {
    expect(demo.check).toBeTruthy();
  });

  test('second level checks', () => {
    expect(demo.one.check).toBeTruthy();
    expect(demo.two.check).toBeTruthy();
  });
});

describe('template methods', () => {
  const demo = templateify({
    one: [{ test: () => true, message: 'Never shown' }],
    two: [{ test: () => false, message: 'Always shown', onlyIf: (p) => !!p.one }],
  });

  test('first level check', async () => {
    await expect(demo.check({ one: 'yes' })).rejects.toBe('Always shown')
    await expect(demo.check({})).resolves.toBeUndefined();
  });

  test('second level checks', async () => {
    await expect(demo.one.check('any')).resolves.toBeUndefined();
    await expect(demo.two.check('any')).rejects.toBe('Always shown');
    await expect(demo.two.check('any', {})).resolves.toBeUndefined();
  });
});

describe('test parameter', () => {
  const myTest = jest.fn(() => true);
  const demo = templateify({
    one: [{ test: myTest, message: 'Never shown' }],
  });

  test('string is trimmed', async () => {
    const str = '  test  1  ';
    await demo.one.check(str);
    expect(myTest).toBeCalledWith(str.trim());
  });

  test('string is trimmed 2', async () => {
    const str = '   ';
    await demo.one.check(str);
    expect(myTest).toBeCalledWith(str.trim());
  });
});
