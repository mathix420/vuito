import type { VTemplateRow, VInputTemplate, VTemplate, VRow, VKeys } from './types';


function getCheckRowFct(tests: VRow[]): VTemplateRow['check'] {
  return (value, parent) => new Promise((resolve, reject) => {
    for (const { message, test, onlyIf } of tests) {
      // Conditional check
      if (onlyIf && parent && !onlyIf(parent)) continue;

      if (value && typeof value === 'string') {
        value = value.trim();
      }

      // If test fail => we reject with error message
      if (!test(value)) reject(message);
    }
    // All tests passed
    resolve();
  })
}

function getGlobalChecker(vKeys: VKeys): VTemplate['check'] {
  return function (object: Record<string, unknown>): Promise<void> {
    return new Promise(async (resolve, reject) => {
      for (const [key, tests] of Object.entries(vKeys)) {
        // Skip `check` method in the template
        // if (key === 'check') return;

        // Perform all sub tests, if any fail, the exit with the error message
        await tests.check(object[key], object).catch(reject);
      }

      // All tests passed
      resolve();
    });
  }
}

function injectSubCheckers(template: VInputTemplate): VKeys {
  return Object.fromEntries(
    Object.entries(template).map(([key, tests]) => {
      return [key, {
        ...tests,
        check: getCheckRowFct(tests)
      } as VTemplateRow]
    })
  )
}

export function templateify(template: VInputTemplate): VTemplate {
  const injectedTemplate = injectSubCheckers(template)
  return {
    ...injectedTemplate,
    check: getGlobalChecker(injectedTemplate)
  } as VTemplate
}
