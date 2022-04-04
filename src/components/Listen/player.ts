import { decodeAsync } from "@msgpack/msgpack";
import { MutableRefObject, useCallback, useRef } from "react";
import { useAsync } from "react-async-hook";
import { IpaSoundsParsed } from "../../utils/parsers";

const fetchAsync = async (packUrl: string | undefined) => {
  if (!packUrl) return;

  const res = await fetch(packUrl);

  if (res.status !== 200 || res.body == null) {
    throw new Error("Unable to load packfile");
  }

  // If this isn't the case, welp, we're screwed and it should hopefully fail and not cause issues
  const contents = (await decodeAsync(res.body)) as Record<string, Uint8Array>;

  return new Map<string, Uint8Array>(
    Object.keys(contents).map((k) => [k, Uint8Array.from(contents[k])])
  );
};

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

const ctx = new AudioContext();
const audioDataCache = new Map<string, AudioBuffer>();

const playBuffer = async (
  source: BufferSource,
  buffer: Uint8Array | undefined,
  key: string
): Promise<boolean> => {
  if (!buffer) {
    return false;
  }
  ctx.resume();

  const buf = audioDataCache.get(key) || (await ctx.decodeAudioData(buffer.buffer.slice(0)));
  audioDataCache.set(key, buf);

  const node = ctx.createBufferSource();
  node.buffer = buf;
  node.connect(ctx.destination);
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
  const { result: response } = useAsync(fetchAsync, [sounds?.packFile]);
  const source = useRef<AudioBufferSourceNode | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    stopAudio(audio);
    stopBuffer(source);
  }, []);

  const buffers = response;

  const play = useCallback(
    async (sym: string): Promise<boolean> => {
      stop();
      const sound = sounds.symbols.get(sym);
      if (!sound) {
        return false;
      }

      return (
        (await playBuffer(source, buffers?.get(sound.audio), sound.audio)) ||
        playFallback(audio, new URL(sound.audio, baseUrl).toString())
      );
    },
    [stop, sounds.symbols, buffers, baseUrl]
  );

  return { play, stop };
};
