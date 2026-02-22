import d3ScriptUrl from 'd3/d3.js?url';
import rickshawScriptUrl from 'rickshaw/rickshaw.js?url';

const scriptPromises = new Map();
let rickshawPromise = null;

const loadScript = (src, readyCheck) => {
  if (readyCheck()) {
    return Promise.resolve();
  }

  if (scriptPromises.has(src)) {
    return scriptPromises.get(src);
  }

  const promise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[data-legacy-src="${src}"]`);

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener(
        'error',
        () => reject(new Error(`Failed to load script: ${src}`)),
        { once: true },
      );
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.dataset.legacySrc = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });

  scriptPromises.set(src, promise);
  return promise;
};

const loadRickshaw = async () => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (window.Rickshaw) {
    return window.Rickshaw;
  }

  if (!rickshawPromise) {
    rickshawPromise = (async () => {
      await loadScript(d3ScriptUrl, () => Boolean(window.d3));
      await loadScript(rickshawScriptUrl, () => Boolean(window.Rickshaw));

      return window.Rickshaw;
    })().catch((error) => {
      rickshawPromise = null;
      throw error;
    });
  }

  return rickshawPromise;
};

export default loadRickshaw;
