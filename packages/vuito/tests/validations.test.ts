import { required, maxLength, minLength, maxValue, minValue, onlyText, regex } from '../src/vuito';

describe('required', () => {
  test('valid one', () => {
    expect(required('valid')).toBeTruthy();
  });

  test('empty array', () => {
    expect(required([])).toBeTruthy();
  });

  test('empty object', () => {
    expect(required({})).toBeTruthy();
  });

  test('undefined', () => {
    expect(required(undefined)).toBeFalsy();
  });

  test('null', () => {
    expect(required(null)).toBeFalsy();
  });

  test('empty string', () => {
    expect(required('')).toBeFalsy();
  });
});

describe('maxLength', () => {
  test('valid string size (= 5)', () => {
    expect(maxLength(5)('valid')).toBeTruthy();
  });

  test('valid array size (= 5)', () => {
    expect(maxLength(5)(Array(5))).toBeTruthy();
  });

  test('valid string size (< 5)', () => {
    expect(maxLength(5)('vali')).toBeTruthy();
  });

  test('valid array size (< 5)', () => {
    expect(maxLength(5)(Array(4))).toBeTruthy();
  });

  test('string too big (> 0)', () => {
    expect(maxLength(0)('bad')).toBeFalsy();
  });

  test('array too big (> 0)', () => {
    expect(maxLength(0)(['bad'])).toBeFalsy();
  });

  test('string too big (> 3)', () => {
    expect(maxLength(3)('bad4')).toBeFalsy();
  });

  test('array too big (> 3)', () => {
    expect(maxLength(3)([1, 2, 3, 4])).toBeFalsy();
  });

  test('max -1 and empty array', () => {
    expect(maxLength(-1)([])).toBeFalsy();
  });

  test('max -1 and empty string', () => {
    expect(maxLength(-1)('')).toBeTruthy();
  });

  test('max -1 and null', () => {
    expect(maxLength(-1)(null)).toBeTruthy();
  });

  test('max -1 and undefined', () => {
    expect(maxLength(-1)(undefined)).toBeTruthy();
  });
});

describe('minLength', () => {
  test('valid string size (= 5)', () => {
    expect(minLength(5)('valid')).toBeTruthy();
  });

  test('valid array size (= 5)', () => {
    expect(minLength(5)(Array(5))).toBeTruthy();
  });

  test('valid string size (> 5)', () => {
    expect(minLength(5)('valid6')).toBeTruthy();
  });

  test('valid array size (> 5)', () => {
    expect(minLength(5)(Array(6))).toBeTruthy();
  });

  test('valid string size (= 0)', () => {
    expect(minLength(0)('')).toBeTruthy();
  });

  test('valid array size (= 0)', () => {
    expect(minLength(0)([])).toBeTruthy();
  });

  test('string too small (< 3)', () => {
    expect(minLength(3)('12')).toBeFalsy();
  });

  test('array too small (< 3)', () => {
    expect(minLength(3)([1, 2])).toBeFalsy();
  });

  test('min 3 and empty array', () => {
    expect(minLength(3)([])).toBeFalsy();
  });

  test('min 3 and empty string', () => {
    expect(minLength(3)('')).toBeTruthy();
  });

  test('min 3 and null', () => {
    expect(minLength(3)(null)).toBeTruthy();
  });

  test('min 3 and undefined', () => {
    expect(minLength(3)(undefined)).toBeTruthy();
  });
});

describe('maxValue', () => {
  test('valid value (5 === 5)', () => {
    expect(maxValue(5)(5)).toBeTruthy();
  });

  test('valid value (5 > 4)', () => {
    expect(maxValue(5)(4)).toBeTruthy();
  });

  test('valid value (0 === 0)', () => {
    expect(maxValue(0)(0)).toBeTruthy();
  });

  test('value too big (3 < 4)', () => {
    expect(maxValue(3)(4)).toBeFalsy();
  });

  test('value too big negative (-1 < 0)', () => {
    expect(maxValue(-1)(0)).toBeFalsy();
  });
});

describe('minValue', () => {
  test('valid value (5 === 5)', () => {
    expect(minValue(5)(5)).toBeTruthy();
  });

  test('valid value (5 < 4)', () => {
    expect(minValue(4)(5)).toBeTruthy();
  });

  test('valid value (0 === 0)', () => {
    expect(minValue(0)(0)).toBeTruthy();
  });

  test('value too small (3 > 4)', () => {
    expect(minValue(4)(3)).toBeFalsy();
  });

  test('value too small negative (-1 > 0)', () => {
    expect(minValue(0)(-1)).toBeFalsy();
  });
});

describe('onlyText', () => {
  function randomUnicodeString(length: number) {
    return Array.from({ length }, () =>
      String.fromCharCode(Math.floor(Math.random() * 65536)),
    ).join('');
  }

  test('valid text', () => {
    expect(onlyText('blabla')).toBeTruthy();
  });

  test('unicode string', () => {
    expect(onlyText(randomUnicodeString(20))).toBeFalsy();
  });

  test('emoji', () => {
    expect(onlyText('🍑🚀')).toBeFalsy();
  });

  test('diacritics without String.normalize', () => {
    const tmp = String.prototype.normalize;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    String.prototype.normalize = null as any;

    const diacritics = 'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöùúûüýÿ';
    expect(onlyText(diacritics)).toBeFalsy();

    String.prototype.normalize = tmp;
  });

  test('valid random', () => {
    expect(onlyText(Math.random().toString(36).substring(7))).toBeTruthy();
  });

  test('invalid random', () => {
    const speChar = Array(256 - 32 - 64)
      .fill(32)
      .map((x, i) => String.fromCharCode(x + i))
      .join('')
      .replace(/[a-z0-9 ]+/gi, '');
    expect(onlyText(speChar[Math.floor(Math.random() * speChar.length)])).toBeFalsy();
  });

  test('diacritics', () => {
    const diacritics = 'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöùúûüýÿ';
    expect(onlyText(diacritics)).toBeTruthy();
  });
});

describe('regex', () => {
  test('valid basic', () => {
    expect(regex(/a/)('bab')).toBeTruthy();
  });

  test('invalid basic', () => {
    expect(regex(/a/)('bbb')).toBeFalsy();
  });

  test('valid with delimiters', () => {
    expect(regex(/^a$/)('a')).toBeTruthy();
  });

  test('invalid with delimiters', () => {
    expect(regex(/^a$/)('ba')).toBeFalsy();
  });

  test('valid with flag', () => {
    expect(regex(/a/i)('A')).toBeTruthy();
  });

  test('invalid without flag', () => {
    expect(regex(/a/)('A')).toBeFalsy();
  });

  test('null test', () => {
    expect(regex(/a/)(null)).toBeFalsy();
  });

  test('undefined test', () => {
    expect(regex(/a/)(undefined)).toBeFalsy();
  });
});
