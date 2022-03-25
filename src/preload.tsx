// Say something
console.log('[EmGui] : Preload execution started');

// Get versions
window.addEventListener('DOMContentLoaded', () => {
  const versions: Record<string, string> = {};

  // Packages version
  for (const type of ['chrome', 'node', 'electron']) {
    versions[type] = process.versions[type];
  }

  const body = document.getElementById('app') as HTMLBodyElement;
  body.setAttribute('data-versions', JSON.stringify(versions));
});
