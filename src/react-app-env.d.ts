/// <reference types="react-scripts" />

interface Window {
  webkitAudioContext: typeof AudioContext;
  toggleDebug: () => void;
}

declare module "zbase32" {
  export function encode(ab: ArrayBuffer): string;
  export function decode(str: string): Uint8Array;

  export function from5bit(ab: ArrayBuffer): Uint8Array;
  export function to5bit(ab: ArrayBuffer): number[];

  export function fromNumber(int: number): Uint8Array;
  export function toNumber(ab: Uint8Array | number[]): number;

  export function encode32bitNumber(int: number): string;
  export function decode32bitNumber(str: string): number;
}
