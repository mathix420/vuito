export default function (value: string): boolean {
  const rgx = /^[a-z0-9 ]+$/i;
  if (!String.prototype.normalize) return !value || rgx.test(value);
  return !value || rgx.test(value.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
}
