import { Template, required, minLength, maxLength } from 'vuito';

const signIn = new Template({
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

export { signIn };
