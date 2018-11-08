# node-strava

An API wrapper for Strava

## Usage

```js
const Strava = require('node-strava)
const strava = new Strava({
  client_id,
  client_secret
})
```

### Login

```js
strava.login(email, password);
```

## Get profile

```js
strava.getProfile();
```
