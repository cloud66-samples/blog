### Publisher

## Usage
```js
npm start
```


## API

**POST /analytics** - receives the body `msg` that is going to be published. The `msg` contains `userId` and `event` type, e.g.

```js
const msg = {
  userId: uuid(),
  event: 'btn_click'
};
```

Table that maps `keys` and `events`, e.g.

```js
{
  'analytics.btn': ['btn_click', 'btn_hover'],
  'analytics.img': ['img_fullscreen', 'img_clicked', 'img_hover']
}
```

Note: Default sends events with key 'analytics.general' if event is not found on the table. Table can be found in [config.js](../config.js).
