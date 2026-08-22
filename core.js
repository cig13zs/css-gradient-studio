;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CSSGradient = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const DEFAULT_STOPS = ['#3b82f6 0%', '#ec4899 55%', '#9333ea 100%'];
  const DEFAULTS = {
    linear: '135deg',
    radial: 'circle at center',
    conic: 'from 90deg at center'
  };

  function splitTopLevel(value, separator) {
    const parts = [];
    let depth = 0;
    let start = 0;

    for (let index = 0; index < value.length; index += 1) {
      const character = value[index];
      if (character === '(') depth += 1;
      else if (character === ')') depth -= 1;
      else if (character === separator && depth === 0) {
        parts.push(value.slice(start, index).trim());
        start = index + 1;
      }

      if (depth < 0) throw new Error('Unbalanced parentheses');
    }

    if (depth !== 0) throw new Error('Unbalanced parentheses');
    parts.push(value.slice(start).trim());
    return parts.filter(Boolean);
  }

  function cleanFragment(value, label) {
    const fragment = String(value || '').trim();
    if (!fragment) throw new Error(`${label} is required`);
    if (/[;{}\r\n]/.test(fragment) || /url\s*\(/i.test(fragment)) {
      throw new Error(`${label} contains unsupported CSS`);
    }
    return fragment;
  }

  function normalizeStops(stops) {
    const list = Array.isArray(stops) ? stops : Array.from(arguments);
    if (list.length < 2) throw new Error('Add at least two color stops');
    if (list.length > 16) throw new Error('Use no more than 16 color stops');
    return list.map((stop) => cleanFragment(stop, 'Color stop'));
  }

  function create(type, descriptor, stops) {
    if (!Object.prototype.hasOwnProperty.call(DEFAULTS, type)) {
      throw new Error('Gradient type must be linear, radial, or conic');
    }

    const safeDescriptor = cleanFragment(descriptor || DEFAULTS[type], 'Gradient direction');
    const safeStops = normalizeStops(stops || DEFAULT_STOPS);
    const value = `${type}-gradient(${safeDescriptor}, ${safeStops.join(', ')})`;
    return {
      type,
      descriptor: safeDescriptor,
      stops: safeStops,
      value,
      css: `background: ${value};`
    };
  }

  function linear(angle, color1, color2) {
    const stops = Array.isArray(color1)
      ? color1
      : [color1 || DEFAULT_STOPS[0], color2 || DEFAULT_STOPS[2]];
    return create('linear', angle || DEFAULTS.linear, stops);
  }

  function radial(shape, stops) {
    return create('radial', shape || DEFAULTS.radial, stops || DEFAULT_STOPS);
  }

  function conic(position, stops) {
    return create('conic', position || DEFAULTS.conic, stops || DEFAULT_STOPS);
  }

  function meshPreset() {
    const value = [
      'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%)',
      'radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%)',
      'radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)'
    ].join(', ');
    return { type: 'mesh', descriptor: 'three-layer preset', stops: [], value, css: `background: ${value};` };
  }

  function parse(input) {
    const source = String(input || '').trim();
    if (!source) return create('linear', DEFAULTS.linear, DEFAULT_STOPS);
    if (/^mesh(?:\s+preset)?$/i.test(source)) return meshPreset();

    const pipe = source.indexOf('|');
    if (pipe === -1) {
      const legacy = splitTopLevel(source, ',');
      if (legacy.length < 3) {
        throw new Error('Use "type settings | color, color" or "angle, color, color"');
      }
      return create('linear', legacy[0], legacy.slice(1));
    }

    const header = source.slice(0, pipe).trim();
    const stopText = source.slice(pipe + 1).trim();
    const match = header.match(/^(linear|radial|conic)(?:\s+(.+))?$/i);
    if (!match) throw new Error('Start with linear, radial, or conic');

    const type = match[1].toLowerCase();
    const descriptor = match[2] || DEFAULTS[type];
    return create(type, descriptor, splitTopLevel(stopText, ','));
  }

  return {
    conic,
    create,
    linear,
    meshPreset,
    parse,
    radial,
    splitTopLevel
  };
});
