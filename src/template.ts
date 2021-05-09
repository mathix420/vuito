import { VTemplateRow, VInputTemplate, VTemplate } from './types';

export class Template {
  [key: string]: VTemplateRow | VTemplate['check'];

  constructor(template: VInputTemplate) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    // Map each fields checker in template
    Object.entries(template as VTemplate).map(([key, tests]) => {
      // Add `check` method to all fields checkers
      tests.check = function (value, parent) {
        return new Promise(async (resolve, reject) => {
          await this.map(({ message, test, onlyIf }) => {
            // Conditional check
            if (onlyIf && parent && !onlyIf(parent)) return;

            if (value && typeof value === 'string') {
              value = value.trim();
            }

            // If test fail => we reject with error message
            if (!test(value)) reject(message);
          });
          // All tests passed
          resolve();
        });
      };

      self[key] = tests;
    });
  }

  /**
   * Global checker
   */
  public check(object: Record<string, unknown>): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await Object.entries(this).map(([key, tests]) => {
        // Skip `check` method in the template
        // if (key === 'check') return;

        // Perform all sub tests, if any fail, the exit with the error message
        (tests as VTemplateRow).check(object[key], object).catch(reject);
      });

      // All tests passed
      resolve();
    });
  }
}
