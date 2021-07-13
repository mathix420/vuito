import { VLengthy, VRow } from '../types';

export default function (max: number): VRow['test'] {
  return (value: VLengthy) => !value || value.length <= max;
}
