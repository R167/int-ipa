import React from "react";
import { Button } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

interface Props {
  baseUrl: string;
  file?: string;
}

const PlayButton = (props: Props) => {
  const { file, baseUrl } = props;

  // hey, it's easier just to use the function than figure it out...
  const audioFile = (() => {
    if (file) {
      const audioUrl = new URL(file, baseUrl).toString();
      const element = new Audio(audioUrl);
      return element;
    }
  })();

  const playAudio = () => {
    if (audioFile) {
      try {
        audioFile.currentTime = 0;
        audioFile.play().catch((e) => {
          console.error({ message: "unable to play url", src: audioFile.src, err: e });
        });
      } catch (e) {
        console.error({ message: "unable to play url", src: audioFile.src, err: e });
      }
    }
  };

  return (
    <Button
      title="Play sound"
      variant="contained"
      color="secondary"
      startIcon={<PlayCircleFilledIcon />}
      onClick={playAudio}
      disabled={!audioFile}
    >
      Play
    </Button>
  );
};

export default React.memo(PlayButton);
