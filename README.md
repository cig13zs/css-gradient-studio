# CSS Gradient Studio

Build and preview linear, radial, conic, and layered mesh gradients. The web app and Chrome extension run locally, keep no history, and make no network requests.


<!-- maintenance-moved -->
> **Maintenance moved:** [`css-gradient`](https://github.com/cig13zs/css-gradient) contains the maintained implementation.
> This repository is kept as a read-only historical release.

[![Live Web App](https://img.shields.io/badge/Web_App-Live_Demo-3B82F6?style=flat-square)](https://cig13zs.github.io/css-gradient-studio/)
[![Chrome Extension](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-10B981?style=flat-square)](https://github.com/cig13zs/css-gradient-studio/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Zero Telemetry](https://img.shields.io/badge/Telemetry-Zero_Tracking-success?style=flat-square)](https://github.com/cig13zs)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-buy_me_a_coffee-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/jju1s)

## Features

- Linear, radial, and conic gradients with up to 16 color stops
- CSS color functions such as `rgb()`, `hsl()`, and `oklch()`
- A three-layer mesh preset
- Live preview and copy-ready `background` CSS
- No dependencies, accounts, analytics, or network access

## Input format

Put the gradient type and its settings before a pipe. Add comma-separated color stops after it.

```text
linear 135deg | #3b82f6 0%, #ec4899 55%, #9333ea 100%
radial circle at 30% 40% | #fff 0%, #111 100%
conic from 45deg at center | red, gold, lime, cyan, blue, red
mesh
```

The earlier `135deg, #3b82f6, #ec4899` format still works.

## Install the Chrome extension

1. Download or clone this repository:
   ```bash
   git clone https://github.com/cig13zs/css-gradient-studio.git
   ```
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right toggle.
4. Click **Load unpacked** and select the `extension/` folder inside this repository.
5. Pin CSS Gradient Studio from Chrome's extensions menu if you want it in the toolbar.

## Run the tests

```bash
node core.test.js
node site.test.js
```

## FAQ

### Is my data uploaded to any server?
No. The tool runs in the page or extension sandbox. It has no extension permissions and does not use analytics or external scripts.

### Can I use the core library in Node.js or JavaScript projects?
Yes. `core.js` uses UMD, so it works with Node.js `require()` and a browser `<script>` tag:

```javascript
const CSSGradient = require('./core');
const result = CSSGradient.parse('radial circle | white, black');
console.log(result.css);
```

## License and support

CSS Gradient Studio is maintained by [jju1s](https://github.com/cig13zs) and released under the [MIT License](LICENSE). If it saves you time, you can support ongoing maintenance on [Ko-fi](https://ko-fi.com/jju1s).
