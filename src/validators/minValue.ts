import { VRow } from '../types';

export default function (min: number): VRow['test'] {
  return (value: string) => min <= parseInt(value, 10);
}
