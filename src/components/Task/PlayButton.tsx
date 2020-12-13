import { memo } from "react";
import { Button, Tooltip } from "@material-ui/core";
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

  // A more robust method would be checking if the audio file loads, but there's no easy way
  // to check this until after the play button is pressed.
  const disable = !audioFile;

  return (
    <Tooltip title={disable ? "No sound file to play" : ""}>
      <div>
        <Button
          title="Play sound"
          variant="contained"
          color="secondary"
          startIcon={<PlayCircleFilledIcon />}
          onClick={playAudio}
          disabled={disable}
        >
          Play
        </Button>
      </div>
    </Tooltip>
  );
};

export default memo(PlayButton);
