const samples = [
  'linear 135deg | #3b82f6 0%, #ec4899 55%, #9333ea 100%',
  'radial circle at 35% 35% | #fef3c7 0%, #f97316 45%, #7c2d12 100%',
  'conic from 45deg at center | #ef4444, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444',
  'mesh'
];
let sampleIndex = 0;

const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');
const statsEl = document.getElementById('output-stats') || document.getElementById('stats');
const previewEl = document.getElementById('preview');

function process() {
  try {
    const result = CSSGradient.parse(inputEl.value);
    outputEl.value = result.css;
    previewEl.style.background = result.value;
    statsEl.dataset.error = 'false';
    statsEl.textContent = result.type === 'mesh'
      ? 'Layered mesh · 3 radial gradients'
      : `${result.type[0].toUpperCase()}${result.type.slice(1)} · ${result.stops.length} stops`;
  } catch (error) {
    outputEl.value = '';
    previewEl.style.removeProperty('background');
    statsEl.dataset.error = 'true';
    statsEl.textContent = `Fix the recipe: ${error.message}`;
  }
}

document.getElementById('btn-run').addEventListener('click', process);
inputEl.addEventListener('input', process);
document.getElementById('btn-sample').addEventListener('click', () => {
  sampleIndex = (sampleIndex + 1) % samples.length;
  inputEl.value = samples[sampleIndex];
  process();
});
document.getElementById('btn-copy').addEventListener('click', async () => {
  if (!outputEl.value) return;
  try {
    await navigator.clipboard.writeText(outputEl.value);
    statsEl.textContent = 'Copied CSS';
  } catch (error) {
    statsEl.dataset.error = 'true';
    statsEl.textContent = 'Clipboard blocked; copy the selected CSS manually.';
  }
});
inputEl.value = samples[0];
process();
