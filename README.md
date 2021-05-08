# vuito
Simple, lightweight, isomorphic, template-based validation library.

[![](https://badgen.net/bundlephobia/tree-shaking/vuito)](https://bundlephobia.com/result?p=vuito) ![](https://badgen.net/bundlephobia/dependency-count/vuito) [![](https://badgen.net/bundlephobia/minzip/vuito)](https://bundlephobia.com/result?p=vuito) [![Maintainability](https://api.codeclimate.com/v1/badges/42b1117477140c6613bb/maintainability)](https://codeclimate.com/github/mathix420/vuito/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/42b1117477140c6613bb/test_coverage)](https://codeclimate.com/github/mathix420/vuito/test_coverage)

---

⚡ [Installation](#installation) ⚡ [Usage](#usage) ⚡ [Vue.js Mixin](#vuejs-mixin) ⚡ [Template Reuse](#template-reuse) ⚡

---

# Installation

```bash
npm i vuito
```
Or via [JsDeliver](https://www.jsdelivr.com/package/npm/vuito?version=latest), [UNPKG](https://unpkg.com/browse/vuito@latest/vuito.min.js), or [bundle.run](https://bundle.run/vuito@latest).

# Usage

## Imports

**CJS**
```javascript
const { regex, required } = require('vuito');
// OR
const regex = require('vuito/validators/regex.cjs');
```

Vuito is fully tree-shakable, so you can import only the methods you need.

**ES6**
```javascript
import { regex, required } from 'vuito';
```
## Templates
With templates you can easily create and reuse validations.

`validations/auth.ts`:
```typescript
import { Template, required, minLength, maxLength } from 'vuito';

export const signIn = new Template({
  username: [
    { test: required, message: 'Please enter a username.' },
    { test: minLength(3), message: 'Username is too short.' },
    { test: maxLength(20), message: 'Username is too big.' },
  ],
  password: [
    { test: required, message: 'Please enter a password.' },
    { test: minLength(12), message: 'Password is too short.' },
  ]
});
```

## Validate

`index.ts`:
```typescript
import { signIn } from './validations/auth';

signIn.check({
  username: 'test123',
  password: 'tooshort',
})
.then(() => console.log('Sign-in data is valid!'))
.catch(console.error)

// Result: console.error: Password is too short.
```

# Vue.js Mixin

[![minizipped size](https://badgen.net/bundlephobia/minzip/@vuito/vue)](https://bundlephobia.com/result?p=@vuito/vue)

Use vuito with Vue.js or Nuxt.js like a breeze!

[Nuxt.js Demo](https://vuito.vercel.app/)

```bash
npm i @vuito/vue
```
`pages/signin.vue`:
```html
<template>
  <span>{{ errors.username }}</span>
  <input type="text" id="username"
    :class="{error: !!errors.username}"
    v-model="fields.username" @input.capture="onInput"
  >

  <span>{{ errors.password }}</span>
  <input type="password" id="password"
    :class="{error: !!errors.password}"
    v-model="fields.password" @input.capture="onInput"
  >
</template>

<script>
import { signIn } from '~/validations/auth';
import Vuito from '@vuito/vue';

export default {
  mixins: [Vuito(signIn)]
}
</script>
```

# Template Reuse

To reuse your validation template you have many solutions.

1. Create a validation package in your monorepo.
2. Create a private package in npm, github, gitlab, ...
3. Any other solution that let you share a js/ts file between projects.
4. Maybe [SWAP](https://github.com/mathix420/swap) would be a good option to you
