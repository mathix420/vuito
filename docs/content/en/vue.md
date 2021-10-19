---
title: Vue
description: ''
position: 30
category: Integrations
---

Use vuito with Vue.js or Nuxt.js like a breeze!

## Installation

<code-group>
  <code-block label="NPM" active>

  ```bash
  npm install @vuito/vue
  ```

  </code-block>
  <code-block label="Yarn">

  ```bash
  yarn add @vuito/vue
  ```

  </code-block>
</code-group>

## Usage

Using the template defined in [Setup](/setup).

```html [pages/signin.vue]
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