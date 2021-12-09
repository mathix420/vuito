<template>
  <form @submit.prevent="checkForm">
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

<style>
form {
  width: 100%;
  margin: auto;
  padding: 30px;
  display: flex;
  max-width: 500px;
  flex-direction: column;
  justify-content: center;
}

label {
  display: flex;
  padding: 30px 0;
  font-weight: 600;
  flex-direction: column;
}

label > span {
  font-size: .7em;
  font-weight: normal;
  color: crimson;
}

input {
  color: white;
  outline: none;
  padding: 10px;
  font-size: 1em;
  margin: 10px 0;
  border-radius: 5px;
  transition: border .2s;
  background: rgba(0, 0, 0, 0.125);
  border: 2px solid rgba(161, 161, 161, 0.259);
}

input:focus {
  border: 2px solid #9a67ea;
}

label.error > input {
  border: 2px solid #dc143c;
}

input[type="submit"] {
  cursor: pointer;
  width: 120px;
  margin: auto;
}

input[type="submit"]:hover {
  border: 2px solid #9a67ea;
}
</style>