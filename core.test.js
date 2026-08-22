const assert = require('assert');
const CSSGradient = require('./core');

const legacy = CSSGradient.linear('90deg', '#ff007a', '#7928ca');
assert.strictEqual(legacy.css, 'background: linear-gradient(90deg, #ff007a, #7928ca);');

const linear = CSSGradient.parse('linear 135deg | rgb(59, 130, 246) 0%, #ec4899 55%, #9333ea 100%');
assert.strictEqual(linear.type, 'linear');
assert.strictEqual(linear.stops.length, 3);
assert.ok(linear.value.includes('rgb(59, 130, 246) 0%'));

const radial = CSSGradient.parse('radial circle at 30% 40% | #fff 0%, #111 100%');
assert.strictEqual(radial.value, 'radial-gradient(circle at 30% 40%, #fff 0%, #111 100%)');

const conic = CSSGradient.parse('conic from 45deg at center | red, gold, lime, cyan, blue, red');
assert.strictEqual(conic.type, 'conic');
assert.strictEqual(conic.stops.length, 6);

const oldInput = CSSGradient.parse('135deg, #3b82f6, #ec4899');
assert.strictEqual(oldInput.type, 'linear');

const mesh = CSSGradient.parse('mesh');
assert.strictEqual(mesh.type, 'mesh');
assert.strictEqual((mesh.value.match(/radial-gradient/g) || []).length, 3);

assert.throws(() => CSSGradient.parse('linear 90deg | red'), /two color stops/);
assert.throws(() => CSSGradient.parse('linear 90deg | red, url(https:\/\/example.com\/x)'), /unsupported CSS/);
assert.throws(() => CSSGradient.parse('linear 90deg | rgb(1, 2, 3, red'), /Unbalanced parentheses/);

console.log('ok, all CSSGradient assertions passed');
