import { MutableRefObject, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import AudioContext from "../utils/AudioContext";

interface Props {
  src?: string;
  ref?: MutableRefObject<WaveSurfer | null>;
}

// Wrapper around wavesource
const Waveform = (props: Props) => {
  const { src, ref } = props;
  const waveform = useRef<HTMLDivElement>(null);
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const audioElement = useRef<HTMLMediaElement>(null);
  const waveSurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!waveform.current) throw new Error("missing waveform ref");

    const surfer = WaveSurfer.create({
      container: waveform.current,
      mediaControls: true,
      mediaType: "audio",
      backend: "MediaElement",
      waveColor: "#A8DBA8",
      progressColor: "#3B8686",
    });

    waveSurfer.current = surfer;

    // surfer.load(audioElement.current || "");

    // return () => {
    //   surfer.destroy();
    // };
  }, []);

  useEffect(() => {
    if (ref) ref.current = waveSurfer.current;
  }, [ref]);

  useEffect(() => {
    if (src && waveSurfer.current) {
      const surfer = waveSurfer.current;

      surfer.on("ready", function () {
        surfer.play();
      });

      surfer.on("error", function (e) {
        console.warn(e);
      });
    }
  }, [src]);

  return (
    <>
      <audio
        src="https://wstyler.ucsd.edu/talks/ipa/voiceless_alveolar_stop.mp3"
        ref={audioElement}
        controls
      />
      <canvas ref={canvasElement} />
      <div ref={waveform} />
    </>
  );
};

export default Waveform;
