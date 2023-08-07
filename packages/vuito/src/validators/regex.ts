import type { VRow } from '../types';

export default function (pattern: string | RegExp): VRow['test'] {
  return (value: string) => new RegExp(pattern).test((value || '').trim());
}
