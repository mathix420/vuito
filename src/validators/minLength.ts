import { VLengthy, VRow } from '../types';

export default function (min: number): VRow['test'] {
  return (value: VLengthy) => !value || min >= value.length;
}
