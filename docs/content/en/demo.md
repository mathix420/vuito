---
title: Demo
position: 11
---

## Form Validation

<Demo></Demo>


## Code of the form

```vue[~/components/Demo.vue]
<template>
  <form @submit.prevent="checkForm">
    <h2>Vuito Form Validation</h2>

    <label class="input" for="username" :class="{error: !!errors.username}">
      Username:
      <span>{{ errors.username }}</span>
      <input
        id="username" v-model="fields.username"
        autocomplete="username" type="text"
        @input.capture="onInput"
      >
    </label>

    <label class="input" for="password" :class="{error: !!errors.password}">
      Password:
      <span>{{ errors.password }}</span>
      <input
        id="password" v-model="fields.password"
        autocomplete="new-password" type="password"
        @input.capture="onInput"
      >
    </label>

    <input type="submit" value="Validate">
  </form>
</template>

<script>
import { signIn } from '../validations/auth.js';
import Vuito from '@vuito/vue';

export default {
  mixins: [Vuito(signIn)],
  methods: {
    checkForm() {
      signIn.check(this.fields)
        .then(() => alert('OK!'))
        .catch(alert)
    }
  }
}
</script>
```


## Validation template

```javascript[~/validations/auth.js]
import { templateify, required, minLength, maxLength } from 'vuito';

export const signIn = templateify({
  username: [
    { test: required, message: 'Please enter a username.' },
    { test: minLength(3), message: 'Username is too short.' },
    { test: maxLength(20), message: 'Username is too big.' },
  ],
  password: [
    { test: required, message: 'Please enter a password.' },
    { test: minLength(12), message: 'Password is too short.' },
  ],
});
```