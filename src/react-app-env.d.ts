/// <reference types="react-scripts" />

interface Window {
  webkitAudioContext: typeof AudioContext;
  toggleDebug: () => void;
}

declare module "zbase32";
