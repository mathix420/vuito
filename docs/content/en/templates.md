---
title: Templates
description: ''
position: 20
category: API Reference
---

## What is a template

Templates are designed to group validations for fields.

For example if you need to validate account creation,
you could imagine a template named `signin` containing
the needed checks for the `username` and `password` fields.

Using templates allows you to check a whole form in just one line.
Simply regroup your forms data in an object to match the template structure, and run `signin.check(formObj)`.

## Define a template

<alert type="info">
    A good practice is to create a new directory to store all your validation templates.
</alert>

Here we use `~/validations/`.

```js[~/validations/auth.js]
import { Template, required, minLength, maxLength } from 'vuito';

export const signin = new Template({
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

## Use a template

```js[~/app.js]
import { signin } from '~/validations/auth.js';

const formData = {
    username: 'bwayne',
    password: 'GothamIsMyCity123',
};

signin.check(formData)
    .then(() => alert("You're good bro!"))
    .catch((err) => alert(`Nah, ${err}`));
```
