# BProgress

A slim progress bar inspired by NProgress.

## Installation

Add [index.js] and [index.css] to your project.

```html
<script src="index.js"></script>
<link rel="stylesheet" href="index.css" />
```

```bash
npm install @bprogress/core
```

Also available via [unpkg] CDN:

- https://unpkg.com/@bprogress/core@1.1.10/dist/index.js
- https://unpkg.com/@bprogress/core@1.1.10/dist/index.css

## Basic usage

Simply call `start()` and `done()` to control the progress bar.

```js
BProgress.start();
BProgress.done();
```

## Advanced usage

**Percentages:** To set a progress percentage, call `.set(n)`, where _n_ is a
number between `0..1`.

```js
BProgress.set(0.0); // Sort a same as .start()
BProgress.set(0.4);
BProgress.set(1.0); // Sort a same as .done()
```

**Incrementing:** To increment the progress bar, just use `.inc()`. This
increments it with a random amount. This will never get to 100%: use it for
every image load (or similar).

```js
BProgress.inc();
```

If you want to increment by a specific value, you can pass that as a parameter:

```js
BProgress.inc(0.2); // This will get the current status value and adds 0.2 until status is 0.994
```

**Force-done:** By passing `true` to `done()`, it will show the progress bar
even if it's not being shown. (The default behavior is that _.done()_ will not
do anything if _.start()_ isn't called)

```js
BProgress.done(true);
```

**Get the status value:** To get the status value, use `.status`

## Configuration

#### `minimum`

Changes the minimum percentage used upon starting. (default: `0.08`)

```js
BProgress.configure({ minimum: 0.1 });
```

#### `maximum`

Changes the maximum percentage used upon finishing. (default: `1`)

```js
BProgress.configure({ maximum: 0.9 });
```

#### `template`

You can change the markup using `template`. To keep the progress
bar working, keep an element with `role='bar'` in there.

```js
BProgress.configure({
  template: `<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>`,
});
```

You can also set the template to `null` to use your own template in your code.

```js
BProgress.configure({
  template: null,
});
```

In your code, you can use the following template:

```html
<div class="bprogress">
  <div class="bar" role="bar">
    <div class="peg"></div>
  </div>
  <div class="spinner" role="spinner">
    <div class="spinner-icon"></div>
  </div>
</div>
```

_Note: You can add multiple templates in your code to have multiple progress bars._

#### `easing` and `speed`

Adjust animation settings using _easing_ (a CSS easing string) and _speed_ (in ms). (default: `ease` and `200`)

```js
BProgress.configure({ easing: 'ease', speed: 500 });
```

#### `trickle`

Turn off the automatic incrementing behavior by setting this to `false`. (default: `true`)

```js
BProgress.configure({ trickle: false });
```

#### `trickleSpeed`

Adjust how often to trickle/increment, in ms.

```js
BProgress.configure({ trickleSpeed: 200 });
```

#### `showSpinner`

Turn off loading spinner by setting it to false. (default: `true`)

```js
BProgress.configure({ showSpinner: false });
```

#### `barSelector`

Specify this to change the bar selector. (default: `[role="bar"]`)

```js
BProgress.configure({ barSelector: '.my-custom-bar' });
```

#### `spinnerSelector`

Specify this to change the spinner selector. (default: `[role="spinner"]`)

```js
BProgress.configure({ spinnerSelector: '.my-custom-spinner' });
```

#### `parent`

Specify this to change the parent container. (default: `body`)

```js
BProgress.configure({ parent: '#container' });
```

#### `direction`

Specify progress bar direction: ltr or rtl. (default `ltr`)

## Customization

Just edit `index.css` to your liking. Tip: you probably only want to find
and replace occurrences of `#29d`.

The included CSS file is pretty minimal... in fact, feel free to scrap it and make your own!

## Issues

If you encounter any problems, do not hesitate to [open an issue](https://github.com/Skyleen77/bprogress/issues) or make a PR [here](https://github.com/Skyleen77/bprogress).

## LICENSE

MIT
