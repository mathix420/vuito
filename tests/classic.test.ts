import { Template, required } from '../src/vuito';

const tmp = new Template({
  test1: [
    { test: required, message: 'Nop!' },
    { test: (v: string) => v.toLowerCase().startsWith('a'), message: 'Nop A!' },
  ],
});

test('lololo startsWith a', () => {
  console.log(tmp);
  expect(tmp.check({ test1: 'lololo' })).rejects.toBe('Nop A!');
});

test('AaA startsWith a', () => {
  expect(tmp.check({ test1: 'AaA' })).resolves.toBeUndefined();
});
