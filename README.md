# vuito
Simple, lightweight, template-based validation for Fullstack devs

![](https://badgen.net/badgesize/normal/https/unpkg.com/vuito@0.0.7/lib/index.min.js) ![](https://badgen.net/badgesize/gzip/https/unpkg.com/vuito@0.0.7/lib/index.min.js) ![](https://badgen.net/badgesize/brotli/https/unpkg.com/vuito@0.0.7/lib/index.min.js)

![](https://badgen.net/packagephobia/install/vuito) ![](https://badgen.net/packagephobia/publish/vuito)

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