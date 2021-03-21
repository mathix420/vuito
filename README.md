# vuito
Simple, lightweight, template-based validation for Fullstack devs

![](https://badgen.net/bundlephobia/tree-shaking/vuito) ![](https://badgen.net/bundlephobia/dependency-count/vuito)

![](https://badgen.net/bundlephobia/minzip/vuito) ![](https://badgen.net/packagephobia/install/vuito)

```typescript
import { Template, regex } from 'vuito';

const test = new Template({
    username: [
        {test: regex(/^a/i), message: 'Username should starts with A.'},
    ]
});

test.check({username: "arnaud"})
    .then(() => console.log('ok'))
    .catch(console.error)
// Info: ok

test.check({username: "mathix"})
    .then(() => console.log('ok'))
    .catch(console.error)
// Error: Username should starts with A.
```