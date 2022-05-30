import { VTemplateRow, VInputTemplate, VTemplate } from './types';

export class Template {
  [key: string]: VTemplateRow | VTemplate['check'];

  constructor(template: VInputTemplate) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    // Map each fields checker in template
    for (const [key, tests] of Object.entries(template as VTemplate)) {
      // Add `check` method to all fields checkers
      (tests as VTemplateRow).check = function (value, parent) {
        return new Promise(async (resolve, reject) => {
          for (const { message, test, onlyIf } of this) {
            // Conditional check
            if (onlyIf && parent && !onlyIf(parent)) return;

            if (value && typeof value === 'string') {
              value = value.trim();
            }

            // If test fail => we reject with error message
            if (!test(value)) reject(message);
          }
          // All tests passed
          resolve();
        });
      };

      self[key] = tests as VTemplateRow;
    }
  }

  /**
   * Global checker
   */
  public check(object: Record<string, unknown>): Promise<void> {
    return new Promise(async (resolve, reject) => {
      for (const [key, tests] of Object.entries(this)) {
        // Skip `check` method in the template
        // if (key === 'check') return;

        // Perform all sub tests, if any fail, the exit with the error message
        (tests as VTemplateRow).check(object[key], object).catch(reject);
      }

      // All tests passed
      resolve();
    });
  }
}
