import { VRow } from '../types';

export default function (min: number): VRow['test'] {
  return (value: string) => parseInt(value, 10) <= min;
}
