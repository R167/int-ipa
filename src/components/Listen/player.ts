import { decodeAsync } from "@msgpack/msgpack";
import { MutableRefObject, useCallback, useRef } from "react";
import { useAsync } from "react-async-hook";
import { IpaSoundsParsed } from "../../utils/parsers";

const fetchAsync = async (packUrl: string | undefined) => {
  if (!packUrl) return;
  console.debug("Fetching packFile", packUrl);

  const res = await fetch(packUrl);

  if (res.status !== 200 || res.body == null) {
    throw new Error("Unable to load packfile");
  }

  // If this isn't the case, welp, we're screwed and it should hopefully fail and not cause issues
  const contents = (await decodeAsync(res.body)) as Record<string, Uint8Array>;

  return contents;
};

interface BufferContext {
  context: AudioContext;
  buffers: Map<string, AudioBuffer>;
}

const createContextAsync = async (
  contents: Record<string, Uint8Array> | undefined
): Promise<BufferContext | undefined> => {
  if (!contents) return;
  console.debug("Creating audio context");

  const context = new AudioContext({ latencyHint: "interactive" });
  const promises = Object.keys(contents).map(async (k) => {
    const data = await context.decodeAudioData(copyBuffer(contents[k]));
    return [k, data] as const;
  });
  const buffers = new Map<string, AudioBuffer>(await Promise.all(promises));

  return { context, buffers };
};

/**
 * Get a copy of a Uint8Array as a raw ArrayBuffer
 *
 * Avoid 2 gotchas of Uint8Array with regards to Web Audio API
 * 1. Uint8Array.buffer => potentially a shared backing store
 * 2. decodeAudioData will detach a buffer, necessitating a copy be made
 */
const copyBuffer = (buffer: Uint8Array): ArrayBuffer =>
  buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

type AudioSource = MutableRefObject<HTMLAudioElement | null>;
type BufferSource = MutableRefObject<AudioBufferSourceNode | null>;

const playNow = (e: any) => e.target.play();
const event = "canplaythrough";

const stopAudio = (tag: AudioSource) => {
  tag.current?.pause();
  tag.current?.removeEventListener(event, playNow);
  tag.current = null;
};

const stopBuffer = (buffer: BufferSource) => {
  buffer.current?.stop(0);
  buffer.current?.disconnect();
  buffer.current = null;
};

const playBuffer = (source: BufferSource, result: BufferContext, key: string) => {
  const { context, buffers } = result;
  const buffer = buffers.get(key);
  if (!buffer) return false;

  context.resume();

  const node = context.createBufferSource();
  node.buffer = buffer;
  node.connect(context.destination);
  node.start(0);

  source.current = node;

  return true;
};

const playFallback = (audio: AudioSource, src: string): boolean => {
  const curr = new Audio(src);
  audio.current = curr;

  curr.addEventListener(event, playNow);

  return true;
};

export const useAudioPlayer = (sounds: IpaSoundsParsed, baseUrl: string) => {
  const { result: response, error: downloadError } = useAsync(fetchAsync, [sounds?.packFile]);
  const { result, error: decodeError } = useAsync(createContextAsync, [response]);
  const source = useRef<AudioBufferSourceNode | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  // Only log errors because we want the AudioContext to gracefully degrade
  if (downloadError) console.error(downloadError);
  if (decodeError) console.error(decodeError);

  const stop = useCallback(() => {
    stopAudio(audio);
    stopBuffer(source);
  }, []);

  const play = useCallback(
    (sym: string): boolean => {
      stop();
      const sound = sounds.symbols.get(sym);
      if (!sound) {
        return false;
      }

      return (
        (result && playBuffer(source, result, sound.audio)) ||
        playFallback(audio, new URL(sound.audio, baseUrl).toString())
      );
    },
    [stop, sounds.symbols, result, baseUrl]
  );

  return { play, stop };
};
